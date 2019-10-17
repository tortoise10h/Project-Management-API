const Joi = require('@hapi/joi')
const httpStatus = require('http-status')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { constant, util } = require('../../common')
const { APIError, apiResponse } = require('../helpers')
const checkFieldsDuplicate = require('../lib/check-fields-duplicate')
const modelFactory = require('../models')
const { sendMail } = require('./../services/email')

class AuthController {
  async signup (req, res, next) {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().required().max(255),
        phone: Joi.string().required().max(40),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(60)
          .required(),
        confirmed: Joi.string()
          .regex(/^[a-zA-Z0-9]{3,30}$/)
          .min(8)
          .max(60)
          .required()
          .valid(Joi.ref('password'))
          .options({
            language: {
              any: {
                allowOnly: 'Passwords do not match'
              }
            }
          }),
        summary: Joi.string().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const {
        email, name, phone
      } = validater.value
      const User = modelFactory.getModel(constant.DB_MODEL.USER)

      /** Validate duplicate */
      const errors = await checkFieldsDuplicate(User, { email, phone })
      const newUserInfo = { ...validater.value }
      delete newUserInfo.summary
      delete newUserInfo.confirmed
      if (errors.length > 0) return next(new APIError(errors, httpStatus.BAD_REQUEST))

      /** Create new user */
      const user = await User.create({ ...newUserInfo })

      /** Create token to confirm account */
      const token = jwt.sign({
        name,
        id: user.id,
        email,
        phone
      }, constant.JWT_SECRET)

      /** Send mail to user to accounce create account success and confirm this account */
      await sendMail(
        'signup',
        {
          token,
          email
        },
        {
          to: email,
          subject: '[Banana Boys] Confirm register account'
        }
      )

      return apiResponse.success(res, user)
    } catch (error) {
      return next(error)
    }
  }

  async confirm (req, res, next) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        token: Joi.string().required()
      })
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const { email, token } = req.body

      const {
        User
      } = modelFactory.getAllModels()

      const user = await User.findOne({
        where: {
          email
        }
      })

      /** Check valid user before confirm */
      if (!user) return next(new APIError('User not exist', httpStatus.NOT_FOUND))
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.BAD_REQUEST))
      if (!user.is_active) return next(new APIError('User is banned', httpStatus.BAD_REQUEST))
      if (user.confirmed) return next(new APIError('User has already verifed', httpStatus.BAD_REQUEST))

      /** Verify token and update confirm status of that user if confirm success */
      jwt.verify(token, constant.JWT_SECRET)
      await User.update({
        confirmed: true
      }, {
        where: {
          id: user.id
        }
      })

      return apiResponse.success(res, { success: true })
    } catch (error) {
      return next(error)
    }
  }

  async login (req, res, next) {
    try {
      /** Validate input */
      const schema = Joi.object().keys({
        email: Joi.string().optional().email({ minDomainSegments: 2 }),
        password: Joi.string().required().max(255)
      })
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const { email, password } = req.body
      if (!(email)) return next(new APIError('Missing username or email', httpStatus.UNAUTHORIZED))

      /** Validate exist */
      const conditions = { where: { email } }
      const User = modelFactory.getModel(constant.DB_MODEL.USER)

      const user = await User.findOne({
        ...conditions
      })

      /** Validate valid user */
      if (!user) return next(new APIError('User not found', httpStatus.NOT_FOUND))
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.BAD_REQUEST))
      if (!user.is_active) return next(new APIError('User is banned', httpStatus.BAD_REQUEST))
      if (!user.confirmed) return next(new APIError('User is not verified', httpStatus.BAD_REQUEST))

      /** Check input password and password in database */
      const match = await bcrypt.compare(password, user.password)
      if (!match) return next(new APIError('Invalid credentials', httpStatus.UNAUTHORIZED))

      /** Generate token */
      const exp = moment.utc().unix() + constant.JWT_EXPIRE_TIME
      const token = jwt.sign({
        name: user.name,
        id: user.id,
        email,
        exp
      }, constant.JWT_SECRET)

      /** Return */
      return apiResponse.success(res, { user, token, exp })
    } catch (error) {
      return next(error)
    }
  }

  async refresh (req, res, next) {
    try {
      /** Validate input */
      const schema = Joi.object().keys({
        token: Joi.string().required()
      })
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      /** Validate token */
      const { token } = req.body
      let decoded
      try {
        jwt.verify(token, constant.JWT_SECRET)
      } catch (err) {
        logger.error(`[Server] Authentication::refresh::verify: ${err.name}`)
        logger.error(`[Server] Authentication::refresh::verify: ${err.message}`)
        if (err.name !== 'TokenExpiredError') {
          return next(new APIError('Token validation error', httpStatus.UNAUTHORIZED))
        }
        decoded = jwt.decode(token, constant.JWT_SECRET)
      }

      /** Validate user status */
      const {
        User
      } = modelFactory.getAllModels()
      const user = await User.findByPk(decoded.id, {
      })
      if (!user) {
        return next(new APIError('User notfound', httpStatus.NOT_FOUND))
      }
      if (!user.is_active) return next(new APIError('User is disabled', httpStatus.UNAUTHORIZED))

      /** Refresh expire time */
      const exp = moment.utc().unix() + constant.JWT_EXPIRE_TIME
      const newToken = jwt.sign({
        ...decoded,
        exp
      }, constant.JWT_SECRET)

      return apiResponse.success(res, { user, token: newToken, exp })
    } catch (error) {
      return next(error)
    }
  }

  async validate (req, res, next) {
    try {
      /** Validate token */
      let token = req.headers['x-access-token'] || req.headers.authorization // Express headers are auto converted to lowercase
      if (!token) return next(new APIError('Missing token', httpStatus.UNAUTHORIZED))
      if (!token.startsWith('Bearer ')) return next(new APIError('Invalid token format', httpStatus.UNAUTHORIZED))
      token = token.slice(7, token.length)

      let decoded
      try {
        decoded = jwt.verify(token, constant.JWT_SECRET)
      } catch (err) {
        token = token.slice(7, token.length)
        logger.error(`[Server] Authentication::refresh::verify: ${err.message}`)
        return next(new APIError('Token validation error', httpStatus.UNAUTHORIZED))
      }

      /** Validate user status */
      const User = modelFactory.getModel(constant.DB_MODEL.USER)
      const user = await User.findByPk(decoded.id)

      if (!user.is_active) return next(new APIError('User is banned', httpStatus.UNAUTHORIZED))
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.UNAUTHORIZED))

      /** Pass to next step */
      req.author = decoded
      return next()
    } catch (error) {
      return next(error)
    }
  }

  permit (...allowed) {
    /** Create function sastify user valid or not follow by role is passed to "...allowed" */
    const isAllowed = (role = '') => allowed.indexOf(role.toLowerCase()) > -1
    return async (req, res, next) => {
      try {
        /** Check user token valid format or exists */
        let token = req.headers['x-access-token'] || req.headers.authorization
        if (!token) return next(new APIError('Missing token', httpStatus.UNAUTHORIZED))
        if (!token.startsWith('Bearer ')) return next(new APIError('Invalid token format', httpStatus.UNAUTHORIZED))
        token = token.slice(7, token.length)

        /** Verify user token */
        let decoded
        try {
          decoded = jwt.verify(token, constant.JWT_SECRET)
        } catch (err) {
          logger.error(`[Server] Authentication::refresh::verify: ${err.message}`)
          return next(new APIError('Token validation error', httpStatus.UNAUTHORIZED))
        }

        const { id, role } = decoded

        const User = modelFactory.getModel(constant.DB_MODEL.USER)
        const user = await User.findByPk(id)

        /** Validate valid user */
        if (!user.confirmed) return next(new APIError('User is not verified', httpStatus.UNAUTHORIZED))
        if (!user.is_active) return next(new APIError('User is banned', httpStatus.UNAUTHORIZED))
        if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.UNAUTHORIZED))

        if (isAllowed(role)) { req.author = decoded; return next() }

        return next(new APIError('Permision denied', httpStatus.FORBIDDEN))
      } catch (error) {
        return next(error)
      }
    }
  }

  async forgotPassword (req, res, next) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email({ minDomainSegments: 2 })
      })
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const { email } = req.body
      const User = modelFactory.getModel(constant.DB_MODEL.USER)
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) return next(new APIError('User not exist', httpStatus.NOT_FOUND))
      if (!user.confirmed) return next(new APIError('User is not verified', httpStatus.UNAUTHORIZED))
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.BAD_REQUEST))
      if (!user.is_active) return next(new APIError('User is banned', httpStatus.BAD_REQUEST))

      const token = jwt.sign({
        username: user.username,
        id: user.id,
        type: user.type
        // exp,
      }, constant.JWT_SECRET)

      await sendMail(
        'forgetPassword',
        {
          token,
          email
        },
        {
          to: email,
          subject: '[CCP] Email forgot password'
        }
      )
      return apiResponse.success(res, user)
    } catch (error) {
      return next(error)
    }
  }

  async changePassword (req, res, next) {
    try {
      const schema = Joi.object().keys({
        oldPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(60),
        newPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(60),
        confirmPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(60),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        token: Joi.string().required()
      })
      const {
        oldPassword, newPassword, email, token,
        confirmPassword
      } = req.body
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      if (!(newPassword === confirmPassword)) return next(new APIError('New password and confirm new password do not match'))
      const authorDecoded = jwt.verify(token, constant.JWT_SECRET)
      if (authorDecoded.email !== email) return next(new APIError('You don\'t have a permission'))
      const User = modelFactory.getModel(constant.DB_MODEL.USER)
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) return next(new APIError('User not exist', httpStatus.NOT_FOUND))
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.BAD_REQUEST))

      /** Check correct old password */
      const match = await bcrypt.compare(oldPassword, user.password)
      if (!match) return next(new APIError('Old password is not correct', httpStatus.BAD_REQUEST))

      // if (!user.is_active) return next(new APIError('User is banned', httpStatus.BAD_REQUEST));
      const updatedPassword = await bcrypt.hash(newPassword, constant.PASSWORD_HASH_SALT_ROUNDS)
      await User.update({ password: updatedPassword }, { where: { email } })
      return apiResponse.success(res, { success: true })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new AuthController()

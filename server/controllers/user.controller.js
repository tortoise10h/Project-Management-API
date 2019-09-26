const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const checkDuplicateFields = require('../lib/check-fields-duplicate')

class UserController {
  async listUser (req, res, next) {
    try {
      const schema = Joi.object().keys({
        sort: Joi.string().optional().default('name'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC'),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
        is_active: Joi.boolean().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        sort, direction, page, offset
      } = validater.value

      /** Map search */
      const filter = {}
      Object.keys(validater.value).forEach((key) => {
        if (!['sort', 'direction', 'page', 'offset'].includes(key)) {
          filter[key] = validater.value[key]
        }
      })

      /** Get list of customer */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const User = modelFactory.getModel(constant.DB_MODEL.USER)
      const users = await User.findAndCountAll({
        where: { ...filter, is_deleted: false },
        order: [[sort, direction]],
        offset: queryOffset,
        limit: queryLimit
      })

      return apiResponse.success(res, util.paginate(users, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async loadUser (req, res, next, userId) {
    try {
      /** Validate input */
      const id = parseInt(userId)
      if (_.isNaN(id)) return next(new APIError([{ field: 'userId', value: userId, message: 'Invalid user id' }], httpStatus.BAD_REQUEST))

      /** Validate existed */
      const { User } = modelFactory.getAllModels()
      const user = await User.findByPk(id)
      if (!user || user.is_deleted) return next(new APIError('User not found', httpStatus.NOT_FOUND))

      /** Load role to query, pass to next step */
      req.user = user
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async getUser (req, res, next) {
    try {
      const { author, user } = req
      if (author.id !== user.id) return next(new APIError('Permission denied', httpStatus.UNAUTHORIZED))
      const {
        User
      } = modelFactory.getAllModels()

      const userInfo = await User.findOne({
        where: {
          id: user.id,
          is_deleted: false
        }
      })

      if (!userInfo) return next(new APIError('User not found', httpStatus.NOT_FOUND))
      return apiResponse.success(res, userInfo)
    } catch (error) {
      return next(error)
    }
  }

  async getMe (req, res, next) {
    try {
      const { author } = req
      const User = modelFactory.getModel(constant.DB_MODEL.USER)
      const userInfo = await User.findOne({
        where: {
          id: author.id,
          is_deleted: false,
          confirmed: true
        }
      })

      if (!userInfo) return next(new APIError('User not found', httpStatus.NOT_FOUND))
      return apiResponse.success(res, userInfo)
    } catch (error) {
      return next(error)
    }
  }

  async updateUser (req, res, next) {
    try {
      const { user } = req

      /** Validate input */
      const schema = Joi.object().keys({
        name: Joi.string().optional().max(255),
        phone: Joi.string().optional().max(40),
        email: Joi.string().optional().email({ minDomainSegments: 2 }),
        password: Joi.string().optional().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(60)
          .optional(),
        summary: Joi.string().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        email, phone
      } = validater.value

      const {
        User
      } = modelFactory.getAllModels()

      /** Validate duplicate field */
      const errors = await checkDuplicateFields(User, { email, phone })

      if (errors.length > 0) {
        return next(new APIError(errors, httpStatus.BAD_REQUEST))
      }

      /** Update user info */
      const updatedUser = await user.update({
        ...validater.value
      })

      /** Return new user updated infor */
      return apiResponse.success(res, updatedUser)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new UserController()

const Joi = require('@hapi/joi');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { constant, util } = require('../../common');
const { APIError, apiResponse } = require('../helpers');
const { parseName } = require('./../lib/');
const modelFactory = require('../models');
const { sendMail } = require('./../services/email');
const verifyRecaptcha = require('./../services/recaptcha');

class AuthController {
  async signup(req, res, next) {
    try {
      const schema = Joi.object().keys({
        type: Joi.string().required().uppercase().valid(Object.values(constant.USER_TYPE)),
        name: Joi.string().required().max(255),
        short_name: Joi.when('type', { is: constant.USER_TYPE.COMPANY, then: Joi.string().required(), otherwise: Joi.string().optional() }),
        phone: Joi.string().required().max(40),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(60)
          .required(),
        confirm: Joi.string()
          .regex(/^[a-zA-Z0-9]{3,30}$/)
          .min(8)
          .max(60)
          .required()
          .valid(Joi.ref('password'))
          .options({
            language: {
              any: {
                allowOnly: 'Passwords do not match',
              },
            },
          }),

      });

      const capchaData = {
        remoteip: req.connection.remoteAddress,
        response: req.body.recaptcha,
      };

      const verifyResult = await verifyRecaptcha(capchaData);
      if (!verifyResult) {
        return next(new APIError([{
          field: 'recaptcha',
          code: 'RECAPTCHA_NOT_VALID',
          message: 'Recaptcha not found.',
        }], httpStatus.BAD_REQUEST));
      }

      delete req.body.recaptcha;

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));

      const {
        type, email, password, name, short_name: shortName, phone,
      } = validater.value;

      /** Validate duplicate */
      const errors = [];
      const {
        // Role,
        User, Log, Customer, Student,
      } = modelFactory.getAllModels();

      /** Duplicate email */
      const duplicateEmail = await User.findOne({ where: { email } });
      if (duplicateEmail) errors.push({ field: 'email', value: email, message: 'Email is already existed' });


      /** Duplicate username */
      let username = null;

      while (!username) {
        username = util.generateUsername(email);
        // eslint-disable-next-line no-await-in-loop
        const duplicateUsername = await User.findOne({ where: { username } });
        if (duplicateUsername) {
          username = null;
        }
      }

      if (errors.length > 0) return next(new APIError(errors, httpStatus.BAD_REQUEST));

      /** Create user for customer */
      const user = await User.create({
        username,
        password,
        email,
        type,
        role: constant.USER_ROLE.CUSTOMER,
      });

      const customer = await Customer.create({
        name,
        short_name: shortName,
        phone,
        email,
        is_active: false,
        userid: user.id,
        type: constant.USER_TYPE.COMPANY ? constant.CUSTOMER_TYPE.COMPANY : constant.CUSTOMER_TYPE.PERSONAL,
      });

      if (type === constant.USER_TYPE.PERSONAL) {
        const parsedName = parseName(name);
        await Student.create({
          first_name: parsedName.firstName,
          last_name: parsedName.lastName,
          phone,
          email,
          is_active: false,
          userid: user.id,
          customer_id: customer.id,
        });
      }
      // const exp = moment.utc().unix() + constant.JWT_EXPIRE_TIME;

      const token = jwt.sign({
        username,
        id: user.id,
        email,
        role: user.role,
        // exp,
      }, constant.JWT_SECRET);

      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      await Log.create({
        userid: user.id,
        ip,
        action: constant.USER_ACTION.SIGNUP,
      });

      await sendMail(
        'signup',
        {
          token,
          email,
        },
        {
          to: email,
          subject: '[CCP] Register email confirmation',
        },
      );

      return apiResponse.success(res, user);
    } catch (error) {
      return next(error);
    }
  }

  async confirm(req, res, next) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        token: Joi.string().required(),
      });
      const validater = Joi.validate(req.body, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));

      const { email, token } = req.body;

      const {
        User, Log, Customer, Student,
      } = modelFactory.getAllModels();

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) return next(new APIError('User not exist', httpStatus.NOT_FOUND));
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.BAD_REQUEST));
      if (!user.is_active) return next(new APIError('User is banned', httpStatus.BAD_REQUEST));
      if (user.confirmed) return next(new APIError('User has already verifed', httpStatus.BAD_REQUEST));

      jwt.verify(token, constant.JWT_SECRET);
      await User.update({
        confirmed: true,
      }, {
        where: {
          id: user.id,
        },
      });

      await Customer.update({
        is_active: true,
      },
      {
        where: {
          userid: user.id,
        },
      });
      await Student.update({
        is_active: true,
      },
      {
        where: {
          userid: user.id,
        },
      });

      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      await Log.create({
        userid: user.id,
        ip,
        action: constant.USER_ACTION.CONFIRM_EMAIL,
      });

      return apiResponse.success(res, { success: true });
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      /** Validate input */
      const schema = Joi.object().keys({
        username: Joi.string().optional().max(255),
        email: Joi.string().optional().email({ minDomainSegments: 2 }),
        password: Joi.string().required().max(255),
      });
      const validater = Joi.validate(req.body, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));
      if (process.env.NODE_ENV === 'production') {
        const capchaData = {
          remoteip: req.connection.remoteAddress,
          response: req.body.recaptcha,
        };

        const verifyResult = await verifyRecaptcha(capchaData);
        if (!verifyResult) {
          return next(new APIError([{
            field: 'recaptcha',
            code: 'RECAPTCHA_NOT_VALID',
            message: 'Recaptcha not found.',
          }], httpStatus.BAD_REQUEST));
        }
      }

      const { username, email, password } = req.body;
      if (!(username || email)) return next(new APIError('Missing username or email', httpStatus.UNAUTHORIZED));

      /** Validate exist */
      const conditions = username ? { where: { username } } : { where: { email } };
      const {
        User, Log, Student, Customer, Teacher,
      } = modelFactory.getAllModels();

      const user = await User.findOne({
        ...conditions,
        include: [Student, Teacher, Customer],
      });

      if (!user) return next(new APIError('User not found', httpStatus.NOT_FOUND));
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.BAD_REQUEST));
      if (!user.is_active) return next(new APIError('User is banned', httpStatus.BAD_REQUEST));
      if (!user.confirmed) return next(new APIError('User is not verifed', httpStatus.BAD_REQUEST));
      const match = await bcrypt.compare(password, user.password);
      if (!match) return next(new APIError('Invalid credentials', httpStatus.UNAUTHORIZED));
      /** Generate token */
      const exp = moment.utc().unix() + constant.JWT_EXPIRE_TIME;
      const token = jwt.sign({
        username,
        id: user.id,
        email,
        role: user.role,
        exp,
      }, constant.JWT_SECRET);

      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      await Log.create({
        userid: user.id,
        ip,
        action: constant.USER_ACTION.LOGIN,
      });
      await User.update({
        lastlogin: new Date(),
        lastip: ip,
      }, { where: { id: user.id } });
      /** Return */
      return apiResponse.success(res, { user, token, exp });
    } catch (error) {
      return next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      /** Validate input */
      const schema = Joi.object().keys({
        token: Joi.string().required(),
      });
      const validater = Joi.validate(req.body, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));

      /** Validate token */
      const { token } = req.body;
      let decoded;
      try {
        jwt.verify(token, constant.JWT_SECRET);
      } catch (err) {
        logger.error(`[Server] Authentication::refresh::verify: ${err.message}`);
        if (err.name !== 'TokenExpiredError') {
          return next(new APIError('Token validation error', httpStatus.UNAUTHORIZED));
        }
        decoded = jwt.decode(token, constant.JWT_SECRET);
      }

      /** Validate user status */
      const {
        User, Log,
      } = modelFactory.getAllModels();
      const user = await User.findByPk(decoded.id, {
      });
      if (!user) {
        return next(new APIError('User notfound', httpStatus.NOT_FOUND));
      }
      if (!user.is_active) return next(new APIError('User is disabled', httpStatus.UNAUTHORIZED));

      /** Refresh expire time */
      const exp = moment.utc().unix() + constant.JWT_EXPIRE_TIME;
      const newToken = jwt.sign({
        ...decoded,
        exp,
      }, constant.JWT_SECRET);

      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      await Log.create({
        userid: user.id,
        ip,
        action: constant.USER_ACTION.REFRESH,
      });

      return apiResponse.success(res, { user, token: newToken, exp });
    } catch (error) {
      return next(error);
    }
  }

  async validate(req, res, next) {
    try {
      /** Validate token */
      let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
      if (!token) return next(new APIError('Missing token', httpStatus.UNAUTHORIZED));
      if (!token.startsWith('Bearer ')) return next(new APIError('Invalid token format', httpStatus.UNAUTHORIZED));
      token = token.slice(7, token.length);

      let decoded;
      try {
        decoded = jwt.verify(token, constant.JWT_SECRET);
      } catch (err) {
        logger.error(`[Server] Authentication::refresh::verify: ${err.message}`);
        return next(new APIError('Token validation error', httpStatus.UNAUTHORIZED));
      }

      /** Validate user status */
      const User = modelFactory.getModel(constant.DB_MODEL.USER);
      const user = await User.findByPk(decoded.id);

      if (!user.confirmed) return next(new APIError('User is not verified', httpStatus.UNAUTHORIZED));
      if (!user.is_active) return next(new APIError('User is banned', httpStatus.UNAUTHORIZED));
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.UNAUTHORIZED));

      /** Pass to next step */
      req.author = decoded;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  permit(...allowed) {
    /** Create function sastify user valid or not follow by role is passed to "...allowed" */
    const isAllowed = (role = '') => allowed.indexOf(role.toLowerCase()) > -1;
    return async (req, res, next) => {
      try {
        /** Check user token valid format or exists */
        let token = req.headers['x-access-token'] || req.headers.authorization;
        if (!token) return next(new APIError('Missing token', httpStatus.UNAUTHORIZED));
        if (!token.startsWith('Bearer ')) return next(new APIError('Invalid token format', httpStatus.UNAUTHORIZED));
        token = token.slice(7, token.length);

        /** Verify user token */
        let decoded;
        try {
          decoded = jwt.verify(token, constant.JWT_SECRET);
        } catch (err) {
          logger.error(`[Server] Authentication::refresh::verify: ${err.message}`);
          return next(new APIError('Token validation error', httpStatus.UNAUTHORIZED));
        }

        const { id, role } = decoded;

        const User = modelFactory.getModel(constant.DB_MODEL.USER);
        const user = await User.findByPk(id);

        /** Validate valid user */
        if (!user.confirmed) return next(new APIError('User is not verified', httpStatus.UNAUTHORIZED));
        if (!user.is_active) return next(new APIError('User is banned', httpStatus.UNAUTHORIZED));
        if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.UNAUTHORIZED));

        if (isAllowed(role)) { req.author = decoded; return next(); }

        return next(new APIError('Permision denied', httpStatus.FORBIDDEN));
      } catch (error) {
        return next(error);
      }
    };
  }

  async forgotPassword(req, res, next) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
      });
      const validater = Joi.validate(req.body, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));

      const { email } = req.body;
      const User = modelFactory.getModel(constant.DB_MODEL.USER);
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) return next(new APIError('User not exist', httpStatus.NOT_FOUND));
      if (!user.confirmed) return next(new APIError('User is not verified', httpStatus.UNAUTHORIZED));
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.BAD_REQUEST));
      if (!user.is_active) return next(new APIError('User is banned', httpStatus.BAD_REQUEST));

      const token = jwt.sign({
        username: user.username,
        id: user.id,
        type: user.type,
        // exp,
      }, constant.JWT_SECRET);

      await sendMail(
        'forgetPassword',
        {
          token,
          email,
        },
        {
          to: email,
          subject: '[CCP] Email forgot password',
        },
      );
      return apiResponse.success(res, user);
    } catch (error) {
      return next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const schema = Joi.object().keys({
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(60),
        prePassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(60),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        token: Joi.string().required(),
      });
      const {
        password, prePassword, email, token,
      } = req.body;
      const validater = Joi.validate(req.body, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));
      if (!(password === prePassword)) return next(new APIError('2 password not match'));
      jwt.verify(token, constant.JWT_SECRET);
      const User = modelFactory.getModel(constant.DB_MODEL.USER);
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) return next(new APIError('User not exist', httpStatus.NOT_FOUND));
      if (user.is_deleted) return next(new APIError('User is deleted', httpStatus.BAD_REQUEST));

      // if (!user.is_active) return next(new APIError('User is banned', httpStatus.BAD_REQUEST));
      const newPassword = await bcrypt.hash(password, constant.PASSWORD_HASH_SALT_ROUNDS);
      await User.update({ password: newPassword }, { where: { email } });
      return apiResponse.success(res, { success: true });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new AuthController();

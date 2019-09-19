const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { Op } = require('sequelize')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const { queryParser } = require('../lib')
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
      if (![constant.USER_ROLE.ADMIN, constant.USER_ROLE.MANAGER].includes(author.role) &&
                user.id !== author.id) {
        return next(new APIError('Permision denied', httpStatus.FORBIDDEN))
      }
      const {
        User, Teacher, Student, Customer
      } = modelFactory.getAllModels()

      const userInfo = await User.findOne({
        where: {
          id: user.id,
          is_deleted: false
        },
        include: [Teacher, Student, Customer]
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
      const {
        User, Teacher, Student, Customer
      } = modelFactory.getAllModels()

      const userInfo = await User.findOne({
        where: {
          id: author.id,
          is_deleted: false,
          confirmed: true
        },
        include: [Teacher, Student, Customer]
      })

      if (!userInfo) return next(new APIError('User not found', httpStatus.NOT_FOUND))
      return apiResponse.success(res, userInfo)
    } catch (error) {
      return next(error)
    }
  }

  async addUser (req, res, next) {
    try {
      /** Validate input */
      const schema = Joi.object().keys({
        name: Joi.string().required().max(255),
        email: Joi.string().required().email({ minDomainSegments: 2 }).max(100),
        password: Joi.string().required().max(255),
        summary: Joi.string().optional(),
        phone: Joi.string().required().max(20)
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        email, phone
      } = validater.value

      const User = modelFactory.getModel(constant.DB_MODEL.USER)
      const errors = await checkDuplicateFields(User, {
        email, phone
      })

      if (errors.length > 0) {
        return next(new APIError(errors, httpStatus.BAD_REQUEST))
      }

      /** Create user */
      const user = await User.create({
        ...validater.value
      })

      /** Return user created */
      return apiResponse.success(res, user)
    } catch (error) {
      return next(error)
    }
  }

  async updateUser (req, res, next) {
    try {
      const { author, user } = req
      if (![constant.USER_ROLE.ADMIN, constant.USER_ROLE.MANAGER].includes(author.role) &&
                (user.id !== author.id)) {
        return next(new APIError('Permission denied', httpStatus.FORBIDDEN))
      }

      /** Validate input */
      const schema = Joi.object().keys({
        type: Joi.string().optional().uppercase().valid(Object.values(constant.USER_TYPE)),
        role: Joi.string().optional().lowercase().valid(Object.values(constant.USER_ROLE)),
        username: Joi.string().optional().max(255),
        password: Joi.string().optional().max(255),
        email: Joi.string().optional().email({ minDomainSegments: 2 }),
        is_active: Joi.boolean().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        email, username
      } = validater.value

      const errors = []
      const {
        User
      } = modelFactory.getAllModels()

      /** Validate duplicate email */
      if (email) {
        const userDuplicateEmail = await User.findOne({
          where: {
            email,
            id: { [Op.ne]: user.id }
          }
        })
        if (userDuplicateEmail) errors.push({ field: 'email', value: email, message: 'Email is already existed' })
      }

      /** Validate duplicate username */
      if (username) {
        const userDuplicateUsername = await User.findOne({
          where: {
            username,
            id: { [Op.ne]: user.id }
          }
        })
        if (userDuplicateUsername) errors.push({ field: 'username', value: username, message: 'Username is already existed' })
      }

      if (errors.length > 0) {
        return next(new APIError(errors, httpStatus.BAD_REQUEST))
      }

      /** Create user */
      const updatedUser = await user.update({
        ...validater.value,
        added_by: req.author.id
      })

      /** Return user created */
      return apiResponse.success(res, updatedUser)
    } catch (error) {
      return next(error)
    }
  }

  async searchUser (req, res, next) {
    try {
      const schema = Joi.object().keys({
        search: Joi.string().optional(),
        searchFields: Joi.string().optional(),
        searchJoin: Joi.string().optional(),
        includes: Joi.string().optional(),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
        sort: Joi.string().optional().default('id'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC')
      })

      const validater = Joi.validate(req.query, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { page, offset } = validater.value
      const User = modelFactory.getModel(constant.DB_MODEL.USER)
      const query = queryParser.filter(req, User)

      const data = await User.findAndCountAll(query)

      return apiResponse.success(res, util.paginate(data, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async listRole (req, res, next) {
    try {
      const schema = Joi.object().keys({
        id: Joi.string().optional(),
        description: Joi.string().optional(),
        is_active: Joi.boolean().optional(),
        sort: Joi.string().optional().default('id'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC'),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET)
      })

      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        sort, direction, page, offset
      } = validater.value

      const filter = {}
      /** Mapping search */
      Object.keys(validater.value).forEach((key) => {
        if (!['page', 'sort', 'direction', 'offset'].includes(key)) {
          switch (typeof validater.value[key]) {
            case 'string':
              filter[key] = { [Op.like]: `%${validater.value[key]}%` }
              break
            case 'boolean':
              filter[key] = validater.value[key]
              break
            default:
              break
          }
        }
      })

      /** Get list of role */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const Role = modelFactory.getModel(constant.DB_MODEL.ROLE)

      const roles = await Role.findAndCountAll({
        where: { ...filter, is_deleted: false },
        order: [[sort, direction]],
        offset: queryOffset,
        limit: queryLimit
      })

      return apiResponse.success(res, util.paginate(roles, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async addRole (req, res, next) {
    try {
      const schema = Joi.object().keys({
        id: Joi.string().alphanum().required().uppercase()
          .max(20),
        description: Joi.string().optional(),
        is_active: Joi.boolean().optional().default(true)
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { id } = validater.value

      /** Validate duplicate */
      const Role = modelFactory.getModel(constant.DB_MODEL.ROLE)
      const oldRole = await Role.findByPk(id)
      if (oldRole) return next(new APIError([{ field: 'id', value: id, message: 'id is already existed' }], httpStatus.BAD_REQUEST))

      /** Add new role */
      const role = await Role.create({ ...validater.value, added_by: req.author.id })
      return apiResponse.success(res, role)
    } catch (error) {
      return next(error)
    }
  }

  async loadRole (req, res, next, roleId) {
    try {
      /** Validate input */
      const schema = Joi.string().alphanum().max(20)
      const validater = Joi.validate(roleId, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const id = validater.value

      /** Validate existed */
      const Role = modelFactory.getModel(constant.DB_MODEL.ROLE)
      const role = await Role.findByPk(id)
      if (!role || role.is_deleted) return next(new APIError('Role not found', httpStatus.NOT_FOUND))

      /** Load role to query, pass to next step */
      req.role = role
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async getRole (req, res, next) {
    try {
      return apiResponse.success(res, req.role)
    } catch (error) {
      return next(error)
    }
  }

  async updateRole (req, res, next) {
    try {
      const schema = Joi.object().keys({
        description: Joi.string().optional(),
        is_active: Joi.boolean().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      if (Object.keys(validater.value) === 0) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { is_active: isActive } = validater.value
      const { role } = req

      if (!_.isUndefined(isActive)) {
        // Todo: handle is_active = false
      }

      /** Update role */
      const updated = await role.update({ ...validater.value })

      return apiResponse.success(res, updated)
    } catch (error) {
      return next(error)
    }
  }

  async searchRole (req, res, next) {
    try {
      const schema = Joi.object().keys({
        search: Joi.string().optional(),
        searchFields: Joi.string().optional(),
        searchJoin: Joi.string().optional(),
        includes: Joi.string().optional(),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
        sort: Joi.string().optional().default('id'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC')
      })

      const validater = Joi.validate(req.query, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { page, offset } = validater.value
      const Role = modelFactory.getModel(constant.DB_MODEL.ROLE)
      const query = queryParser.filter(req, Role)

      const data = await Role.findAndCountAll(query)

      return apiResponse.success(res, util.paginate(data, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async deleteRole (req, res, next) {
    return next(new APIError('Under construction', httpStatus.NOT_IMPLEMENTED))
  }

  async listUserType (req, res, next) {
    try {
      const schema = Joi.object().keys({
        id: Joi.string().optional(),
        sort: Joi.string().optional().default('id'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC'),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
        description: Joi.string().optional(),
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
          switch (typeof validater.value[key]) {
            case 'string':
              filter[key] = { [Op.like]: `%${validater.value[key]}%` }
              break
            case 'boolean':
              filter[key] = validater.value[key]
              break
            default:
              break
          }
        }
      })

      /** Get list of user type */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const UserType = modelFactory.getModel(constant.DB_MODEL.USER_TYPE)

      const usertypes = await UserType.findAndCountAll({
        where: { ...filter, is_deleted: false },
        order: [[sort, direction]],
        offset: queryOffset,
        limit: queryLimit
      })

      return apiResponse.success(res, util.paginate(usertypes, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async addUserType (req, res, next) {
    try {
      const schema = Joi.object().keys({
        id: Joi.string().alphanum().required().uppercase()
          .max(20),
        description: Joi.string().optional(),
        is_active: Joi.boolean().optional().default(true)
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { id } = validater.value

      /** Validate duplicate */
      const UserType = modelFactory.getModel(constant.DB_MODEL.USER_TYPE)
      const old = await UserType.findByPk(id)
      if (old) return next(new APIError([{ field: 'id', value: id, message: 'Id is already existed' }], httpStatus.BAD_REQUEST))

      /** Add new role */
      const userType = await UserType.create({ ...validater.value, added_by: req.author.id })
      return apiResponse.success(res, userType)
    } catch (error) {
      return next(error)
    }
  }

  async loadUserType (req, res, next, userTypeId) {
    try {
      /** Validate input */
      const schema = Joi.string().alphanum().required().max(20)
      const validater = Joi.validate(userTypeId, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const id = validater.value

      /** Validate existed */
      const UserType = modelFactory.getModel(constant.DB_MODEL.USER_TYPE)
      const userType = await UserType.findByPk(id)
      if (!userType || userType.is_deleted) return next(new APIError('UserType not found', httpStatus.NOT_FOUND))

      /** Load role to query, pass to next step */
      req.userType = userType
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async getUserType (req, res, next) {
    try {
      return apiResponse.success(res, req.userType)
    } catch (error) {
      return next(error)
    }
  }

  async updateUserType (req, res, next) {
    try {
      const schema = Joi.object().keys({
        description: Joi.string().optional(),
        is_active: Joi.boolean().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      if (Object.keys(validater.value).length === 0) return next(new APIError('Missing data for update', httpStatus.BAD_REQUEST))
      const { is_active: isActive } = validater.value
      const { userType } = req

      if (!_.isUndefined(isActive)) {
        // Todo: handle is_active = false
      }

      /** update userType */
      const updated = await userType.update({ ...validater.value })

      /** return updated userType */
      return apiResponse.success(res, updated)
    } catch (error) {
      return next(error)
    }
  }

  async searchUserType (req, res, next) {
    try {
      const schema = Joi.object().keys({
        search: Joi.string().optional(),
        searchFields: Joi.string().optional(),
        searchJoin: Joi.string().optional(),
        includes: Joi.string().optional(),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
        sort: Joi.string().optional().default('id'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC')
      })

      const validater = Joi.validate(req.query, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { page, offset } = validater.value
      const UserType = modelFactory.getModel(constant.DB_MODEL.USER_TYPE)
      const query = queryParser.filter(req, UserType)

      const data = await UserType.findAndCountAll(query)

      return apiResponse.success(res, util.paginate(data, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async deleteUserType (req, res, next) {
    return next(new APIError('Under construction', httpStatus.NOT_IMPLEMENTED))
  }
}

module.exports = new UserController()

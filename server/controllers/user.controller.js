const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const fs = require('fs')
const checkDuplicateFields = require('../lib/check-fields-duplicate')

const { Op } = require('sequelize')

class UserController {
  async listUser (req, res, next) {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        phone: Joi.string().optional(),
        birthday: Joi.date().optional(),
        address: Joi.string().optional(),
        profile_title: Joi.string().optional(),
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
          switch (typeof validater.value[key]) {
            case 'string':
              filter[key] = { [Op.like]: `%${validater.value[key]}%` }
              break
            default:
              break
          }
        }
      })

      /** Get list of customer */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const User = modelFactory.getModel(constant.DB_MODEL.USER)
      const users = await User.findAndCountAll({
        where: { ...filter, is_deleted: false },
        order: [[sort, direction]],
        attributes: {
          exclude: [...constant.UNNECESSARY_FIELDS, 'password']
        },
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

  async listUserProject (req, res, next) {
    try {
      const schema = Joi.object().keys({
        user_id: Joi.number().optional(),
        project_id: Joi.number().optional(),
        role: Joi.string().optional(),
        sort: Joi.string().optional().default('createdAt'),
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
          switch (typeof validater.value[key]) {
            case 'string':
              filter[key] = { [Op.like]: `%${validater.value[key]}%` }
              break
            case 'boolean':
            case 'number':
              filter[key] = validater.value[key]
              break
            default:
              break
          }
        }
      })

      const { project } = req
      /** Get list of customer */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const UserProject = modelFactory.getModel(constant.DB_MODEL.USER_PROJECT)
      const userProjects = await UserProject.findAndCountAll({
        where: { ...filter, is_deleted: false, project_id: project.id },
        order: [[sort, direction]],
        attributes: {
          exclude: [...constant.UNNECESSARY_FIELDS]
        },
        offset: queryOffset,
        limit: queryLimit
      })

      return apiResponse.success(res, util.paginate(userProjects, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async getUser (req, res, next) {
    try {
      const { author, user } = req
      if (author.id !== user.id) return next(new APIError('You don\'t have a permission', httpStatus.UNAUTHORIZED))
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
      const { user, author, file } = req

      /** Make sure only user can update his/her info */
      if (author.id !== user.id) {
        return next(new APIError('You don\'t have a permission', httpStatus.UNAUTHORIZED))
      }
      /** Validate input */
      const schema = Joi.object().keys({
        name: Joi.string().optional().max(255),
        phone: Joi.string().optional().max(40),
        email: Joi.string().optional().email({ minDomainSegments: 2 }),
        password: Joi.string().optional().min(8).max(60),
        summary: Joi.string().optional(),
        address: Joi.string().optional().max(255),
        profile_title: Joi.string().optional().max(255),
        birthday: Joi.date().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        email, phone
      } = validater.value
      const updateInfo = { ...validater.value }

      const {
        User
      } = modelFactory.getAllModels()

      /** Validate duplicate field */
      const errors = await checkDuplicateFields(User, { email, phone }, user.id)

      if (errors.length > 0) {
        return next(new APIError(errors, httpStatus.BAD_REQUEST))
      }

      /** If has file sent => update user avatar */
      if (file) {
        updateInfo.photo_location = file.path
      }

      /** Remove user old avatar */
      if (updateInfo.photo_location && user.photo_location) {
        fs.unlink(user.photo_location, () => {})
      }

      /** Update user info */
      const updatedUser = await user.update({
        ...updateInfo
      })

      /** Return new user updated infor */
      return apiResponse.success(res, updatedUser)
    } catch (error) {
      return next(error)
    }
  }

  async loadUserProject (req, res, next, userProjectId) {
    try {
      /** Validate input */
      const id = parseInt(userProjectId)
      if (_.isNaN(id)) return next(new APIError([{ field: 'userProjectId', value: userProjectId, message: 'Invalid user project id' }], httpStatus.BAD_REQUEST))

      /** Validate existed */
      const { UserProject } = modelFactory.getAllModels()
      const userProject = await UserProject.findByPk(id)
      if (!userProject || userProject.is_deleted) return next(new APIError('User project not found', httpStatus.NOT_FOUND))

      /** Load user project to query, pass to next step */
      req.userProject = userProject
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async getUserProject (req, res, next) {
    try {
      return apiResponse.success(res, req.userProject)
    } catch (error) {
      return next(error)
    }
  }

  async addUserToProject (req, res, next) {
    try {
      const schema = Joi.object().keys({
        user_id: Joi.number().min(1).required()
      })
      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { user_id: userId } = validater.value
      const { project, author } = req
      const { User, UserProject } = modelFactory.getAllModels()

      /** Validate correct owner */
      if (project.owner !== author.id) {
        return next(new APIError('You don\'t have a permission', httpStatus.UNAUTHORIZED))
      }

      const oldUserProject = await UserProject.findOne({
        where: {
          user_id: userId,
          project_id: project.id
        }
      })
      const errors = []
      if (oldUserProject) errors.push({ field: 'userId', value: userId, message: 'Duplicate user in project' })
      if (errors.length > 0) {
        return next(new APIError(errors, httpStatus.BAD_REQUEST))
      }

      /** Validate valid user */
      const user = await User.findByPk(userId)
      if (!user || user.is_deleted || !user.is_active) {
        return next(new APIError('User is not valid', httpStatus.BAD_REQUEST))
      }

      if (user.id === project.owner) {
        return next(new APIError('You are the owner of project!', httpStatus.BAD_REQUEST))
      }

      /** Add user to project */
      await UserProject.create({
        user_id: userId,
        project_id: project.id,
        role: constant.USER_ROLE.MEMBER
      })

      return apiResponse.success(res, `Add user with id ${userId} to project successfully`)
    } catch (error) {
      return next(error)
    }
  }

  async removeUserFromProject (req, res, next) {
    try {
      const schema = Joi.object().keys({
        user_id: Joi.number().min(1).required()
      })
      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { user_id: userId } = validater.value
      const { project, author } = req
      const { User, UserProject } = modelFactory.getAllModels()

      /** Validate project owner */
      if (project.owner !== author.id) return next(new APIError('You don\'t have a permission', httpStatus.UNAUTHORIZED))

      /** Validate valid user */
      const user = await User.findByPk(userId)
      if (!user || user.is_deleted || !user.is_active) {
        return next(new APIError('User is not valid', httpStatus.BAD_REQUEST))
      }

      if (user.id === project.owner) {
        return next(new APIError('You can\'t remove yourself from project', httpStatus.BAD_REQUEST))
      }

      /** Validate user in project */
      const oldUserProject = await UserProject.findOne({
        where: {
          user_id: userId
        }
      })
      if (!oldUserProject) return next(new APIError({ field: 'userId', value: userId, message: 'User is not in project' }, httpStatus.BAD_REQUEST))

      /** Remove user from project */
      await UserProject.destroy({
        where: {
          user_id: userId,
          project_id: project.id
        }
      })
      return apiResponse.success(res, 'Remove user successfully')
    } catch (error) {
      return next(error)
    }
  }

  async updateUserRoleInProject (req, res, next) {
    try {
      const { author, project, userProject } = req
      /** Validate valid owner of project */
      if (author.id !== project.owner) {
        return next(new APIError('You don\'t have a permission'), httpStatus.BAD_REQUEST)
      }
      const schema = Joi.object().keys({
        role: Joi.string().required().valid([constant.USER_ROLE.MEMBER, constant.USER_ROLE.LEADER])
      })
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { role } = validater.value
      const updatedUserProject = await userProject.update({
        role
      })

      return apiResponse.success(res, updatedUserProject)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new UserController()

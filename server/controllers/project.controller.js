const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const { Op } = require('sequelize')

class ProjectController {
  async addProject (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required().max(255),
        description: Joi.string().optional(),
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional()
      })

      const { author } = req
      /** Validate Input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { Project, UserProject } = modelFactory.getAllModels()

      /** Validate Duplicate */
      const newProjectInfo = { ...validater.value }
      newProjectInfo.owner = author.id

      const sequelize = modelFactory.getConnection()
      /** Create new project */
      const newProject = await sequelize.transaction(async (t) => {
        const result = await Project.create({ ...newProjectInfo }, { transaction: t })
        await UserProject.create({
          user_id: author.id,
          project_id: result.id,
          role: constant.USER_ROLE.ADMIN
        }, { transaction: t })
        return result
      })
      return apiResponse.success(res, newProject)
    } catch (error) {
      return next(error)
    }
  }

  async loadProject (req, res, next, projectId) {
    try {
      /** Validate project id */
      const id = parseInt(projectId)
      if (_.isNaN(id)) return next(new APIError([{ field: 'projectId', value: projectId, message: 'Invalid project id' }], httpStatus.BAD_REQUEST))

      /** Validate existed */
      const { Project } = modelFactory.getAllModels()
      const project = await Project.findByPk(id)
      if (!project || project.is_deleted) return next(new APIError('Project not found', httpStatus.BAD_REQUEST))
      req.project = project
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async updateProject (req, res, next) {
    try {
      const { project } = req

      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        description: Joi.string().optional(),
        status: Joi.string().optional().max(255)
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      /** Update project info */
      const updatedProject = await project.update({ ...validater.value })

      /** Return new project update info */
      return apiResponse.success(res, updatedProject)
    } catch (error) {
      return next(error)
    }
  }

  async listProject (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        description: Joi.string().optional(),
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional(),
        status: Joi.string().optional().max(255),
        is_active: Joi.boolean().optional(),
        owner: Joi.number().optional(),
        sort: Joi.string().optional().default('title'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC']).default('ASC'),
        is_favorite: Joi.boolean().optional(),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET).default(constant.SERVER.API_DEFAULT_OFFSET)
      })
      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        sort, direction, page, offset, is_favorite: isFavorite
      } = validater.value

      const { author } = req

      /** Map search */
      const filter = {}
      Object.keys(validater.value).forEach((key) => {
        if (!['sort', 'direction', 'page', 'offset', 'is_favorite'].includes(key)) {
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

      const userProjectWhere = {
        user_id: author.id
      }

      if (isFavorite) userProjectWhere.is_favorite = isFavorite

      /** Get list of project */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const { Project, User, UserProject } = modelFactory.getAllModels()
      const projects = await Project.findAndCountAll({
        where: {
          ...filter, is_deleted: false
        },
        distinct: true,
        order: [[sort, direction]],
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: [...constant.UNNECESSARY_FIELDS, 'password']
            }
          },
          {
            model: UserProject,
            require: true,
            where: { ...userProjectWhere }
          }
        ],
        offset: queryOffset,
        limit: queryLimit
      })

      projects.rows = projects.rows.map((project) => {
        project = project.toJSON()
        /** Remove user project field */
        project.Users = project.Users.map((user) => {
          delete user.UserProject
          return user
        })
        project.is_favorite = project.UserProjects[0].is_favorite
        project.user_role = project.UserProjects[0].role
        delete project.UserProjects
        return project
      })

      return apiResponse.success(res, util.paginate(projects, page, offset))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new ProjectController()

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
      const Project = modelFactory.getModel(constant.DB_MODEL.PROJECT)

      /** Validate Duplicate */
      const newProjectInfo = { ...validater.value }
      newProjectInfo.owner = author.id

      /** Create new project */
      const newProject = await Project.create({ ...newProjectInfo })
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
        description: Joi.string().optional().max(255),
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional(),
        status: Joi.string().optional().max(255),
        is_active: Joi.boolean().optional(),
        owner: Joi.string().optional(),
        sort: Joi.string().optional().default('title'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC']).default('ASC'),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET).default(constant.SERVER.API_DEFAULT_OFFSET)
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

      /** Get list of project */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const { Project, User } = modelFactory.getAllModels()
      const projects = await Project.findAndCountAll({
        where: {
          ...filter, is_deleted: false
        },
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
          }
        ],
        offset: queryOffset,
        limit: queryLimit
      })

      projects.rows = projects.rows.map((project) => {
        project = project.toJSON()
        project.Users = project.Users.map((user) => {
          delete user.UserProject
          return user
        })
        return project
      })

      return apiResponse.success(res, util.paginate(projects, page, offset))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new ProjectController()

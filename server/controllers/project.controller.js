const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')

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
}

module.exports = new ProjectController()

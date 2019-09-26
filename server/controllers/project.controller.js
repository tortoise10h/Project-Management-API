const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
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
}

module.exports = new ProjectController()

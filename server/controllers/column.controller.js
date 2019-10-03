const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')

class ColumnController {
  async addColumn (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required().max(255),
        description: Joi.string().optional()
      })
      const { author, project } = req

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const Column = modelFactory.getModel(constant.DB_MODEL.COLUMN)
      const newColumnInfo = { ...validater.value }
      newColumnInfo.created_by = author.id
      newColumnInfo.project_id = project.id

      /** Create new label */
      const column = await Column.create({ ...newColumnInfo })
      return apiResponse.success(res, column)
    } catch (error) {
      return next(error)
    }
  }

  async loadColumn (req, res, next, columnId) {
    try {
      /** Validate column id */
      const id = parseInt(columnId)
      if (_.isNaN(id)) return next(new APIError([{ field: 'columnId', value: columnId, message: 'Invalid column' }], httpStatus.BAD_REQUEST))

      /** Validate existed */
      const { Column } = modelFactory.getAllModels()
      const column = await Column.findByPk(id)
      if (!column || column.is_deleted) return next(new APIError('Column not found'), httpStatus.BAD_REQUEST)

      req.column = column
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async updateColumn (req, res, next) {
    try {
      const { column } = req

      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        description: Joi.string().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      /** Update column info */
      const updatedColumn = await column.update({ ...validater.value })

      /** Return new column update info */
      return apiResponse.success(res, updatedColumn)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new ColumnController()

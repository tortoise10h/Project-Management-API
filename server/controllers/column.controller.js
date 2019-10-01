const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
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
      const { author } = req

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const Column = modelFactory.getModel(constant.DB_MODEL.COLUMN)
      const newColumnInfo = { ...validater.value }
      newColumnInfo.created_by = author.id

      /** Create new label */
      const column = await Column.create({ ...newColumnInfo })
      return apiResponse.success(res, column)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new ColumnController()

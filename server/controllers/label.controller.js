const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')

class LabelController {
  async addLabel (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required().max(255),
        color: Joi.string().required().max(255)
      })
      const { author } = req

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const Label = modelFactory.getModel(constant.DB_MODEL.LABEL)
      const newLabelInfo = { ...validater.value }
      newLabelInfo.created_by = author.id

      /** Create new label */
      const label = await Label.create({ ...newLabelInfo })
      return apiResponse.success(res, label)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new LabelController()

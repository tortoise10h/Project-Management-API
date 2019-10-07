const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const { Op } = require('sequelize')

class LabelController {
  async addLabel (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required().max(255),
        color: Joi.string().required().max(255)
      })
      const { author, project } = req

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const Label = modelFactory.getModel(constant.DB_MODEL.LABEL)
      const newLabelInfo = { ...validater.value }
      newLabelInfo.created_by = author.id
      newLabelInfo.project_id = project.id

      /** Create new label */
      const label = await Label.create({ ...newLabelInfo })
      return apiResponse.success(res, label)
    } catch (error) {
      return next(error)
    }
  }

  async loadLabel (req, res, next, labelId) {
    try {
      /** Validate label id */
      const id = parseInt(labelId)
      if (_.isNaN(id)) return next(new APIError([{ field: 'labelId', value: labelId, message: 'Invalid label' }], httpStatus.BAD_REQUEST))

      /** Validate exsited */
      const { Label } = modelFactory.getAllModels()
      const label = await Label.findByPk(id)
      if (!label || label.is_deleted) return next(new APIError('Label not found', httpStatus.BAD_REQUEST))

      req.label = label
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async updateLabel (req, res, next) {
    try {
      const { label } = req

      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        color: Joi.string().optional().max(255)
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      /** Update label info */
      const updatedLabel = await label.update({ ...validater.value })

      /** Return new label update info */
      return apiResponse.success(res, updatedLabel)
    } catch (error) {
      return next(error)
    }
  }

  async listLabel (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        color: Joi.string().optional().max(255),
        created_by: Joi.number().optional(),
        is_active: Joi.boolean().optional(),
        project_id: Joi.number().optional(),
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

      const { project } = req
      /** Get list of label */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const Label = modelFactory.getModel(constant.DB_MODEL.LABEL)
      const labels = await Label.findAndCountAll({
        where: {
          ...filter, is_deleted: false, project_id: project.id
        },
        order: [[sort, direction]],
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        offset: queryOffset,
        limit: queryLimit
      })

      return apiResponse.success(res, util.paginate(labels, page, offset))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new LabelController()

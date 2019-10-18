const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const { Op } = require('sequelize')

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

      const { title } = validater.value
      const Column = modelFactory.getModel(constant.DB_MODEL.COLUMN)
      /** Validate duplicate title in project */
      const column = await Column.findOne({
        where: {
          title: title,
          project_id: project.id,
          is_deleted: false
        }
      })

      if (column) return next(new APIError('Title must be uniqued'), httpStatus.BAD_REQUEST)

      const newColumnInfo = { ...validater.value }
      newColumnInfo.created_by = author.id
      newColumnInfo.project_id = project.id

      /** Create new label */
      const createColumn = await Column.create({ ...newColumnInfo })
      return apiResponse.success(res, createColumn)
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

  async listColumn (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        description: Joi.string().optional(),
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
      const Column = modelFactory.getModel(constant.DB_MODEL.COLUMN)
      const columns = await Column.findAndCountAll({
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

      return apiResponse.success(res, util.paginate(columns, page, offset))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new ColumnController()

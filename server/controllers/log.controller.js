const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const moment = require('moment')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')

const { Op } = require('sequelize')

const logActivity = async (author, action, description, projectId) => {
  try {
    const Log = modelFactory.getModel(constant.DB_MODEL.LOG)
    const newLogInfo = {
      user_id: author.id,
      project_id: projectId,
      description,
      action,
      time_logged: moment()
    }

    /** Log new activity  */
    const newLog = await Log.create({
      ...newLogInfo
    })
    return newLog
  } catch (error) {
    return error
  }
}

class LogController {
  async listLog (req, res, next) {
    try {
      const schema = Joi.object().keys({
        action: Joi.string().optional(),
        description: Joi.string().optional(),
        project_id: Joi.number().optional(),
        user_id: Joi.number().optional(),
        is_active: Joi.boolean().optional(),
        sort: Joi.string().optional().default('createdAt'),
        date: Joi.date().optional(),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC'),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET)
      })

      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        sort, direction, page, offset
      } = validater.value
      const { author, project } = req
      const { Log, Project } = modelFactory.getAllModels()

      /** Map search */
      const filter = {}
      Object.keys(validater.value).forEach((key) => {
        if (!['sort', 'direction', 'page', 'offset', 'date'].includes(key)) {
          switch (typeof validater.value[key]) {
            case 'string':
              filter[key] = { [Op.like]: `%${validater.value[key]}%` }
              break
            case 'number':
              filter[key] = validater.value[key]
              break
            case 'object': {
              if (validater.value[key] instanceof Date) {
                filter[key] = validater.value[key]
              }
              break
            }
            default:
              break
          }
        }
      })

      /** If project exists in req -> just show logs of that project */
      const include = []
      if (project) {
        include.push({
          model: Project,
          where: { id: project.id },
          require: true
        })
      }

      /** Get list of logs */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const logs = await Log.findAndCountAll({
        where: { ...filter, is_deleted: false },
        order: [[sort, direction]],
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        include,
        offset: queryOffset,
        limit: queryLimit
      })

      /** Format result */
      logs.rows = logs.rows.map((log) => {
        log = log.toJSON()
        /** Remove unneccessary Project field */
        delete log.Project
        return log
      })

      return apiResponse.success(res, util.paginate(logs, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async loadLog (req, res, next, logId) {
    try {
      /** Validate project id */
      const id = parseInt(logId)
      if (_.isNaN(id)) return next(new APIError([{ field: 'logId', value: logId, message: 'Invalid log id' }], httpStatus.BAD_REQUEST))

      /** Validate existed */
      const { Log } = modelFactory.getAllModels()
      const log = await Log.findByPk(id, {
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        }
      })
      if (!log || log.is_deleted) return next(new APIError('Log not found', httpStatus.BAD_REQUEST))
      req.log = log
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async getLog (req, res, next) {
    try {
      return apiResponse.success(res, req.log)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports.log = new LogController()
module.exports.logActivity = logActivity

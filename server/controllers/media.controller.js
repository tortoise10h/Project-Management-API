const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const { Op } = require('sequelize')
const logController = require('./log.controller')
const { logUpdate } = require('../lib/log-message')

class MediaController {
  async addMedia (req, res, next) {
    try {
      const { task, author, file } = req

      /** Check when file is not uploaded */
      if (!req.file) return next(new APIError('Please add a file'), httpStatus.BAD_REQUEST)

      /** Validate input */
      const schema = Joi.object().keys({
        title: Joi.string().required().max(255)
      })

      const validater = Joi.validate({ title: file.originalname }, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_GATEWAY))

      const { Media, Task, Column } = modelFactory.getAllModels()
      const newMediaInfo = {
        ...validater.value,
        media_location: file.path,
        task_id: task.id,
        created_by: author.id
      }

      /** Create new media */
      const newMedia = await Media.create({ ...newMediaInfo })

      /** Get task include column info for log purpose */
      const taskInfo = await Task.findByPk(task.id, {
        attributes: ['id', 'title'],
        include: {
          model: Column,
          attributes: ['id', 'project_id']
        }
      })

      /** Log user activity */
      await logController.logActivity(
        req.author,
        constant.LOG_ACTION.ADD,
        `${req.author.name} created new media: [File] ${file.originalname}`,
        taskInfo.Column.project_id
      )
      return apiResponse.success(res, newMedia)
    } catch (error) {
      return next(error)
    }
  }

  async loadMedia (req, res, next, mediaId) {
    try {
      /** Validate media id */
      const id = parseInt(mediaId)
      if (_.isNaN(id)) return next(new APIError([{ field: 'mediaId', value: mediaId, message: 'Invalid media' }], httpStatus.BAD_REQUEST))

      /** Validate existed */
      const { Media } = modelFactory.getAllModels()
      const media = await Media.findByPk(id)
      if (!media || media.is_deleted) return next(new APIError('Media not found', httpStatus.BAD_REQUEST))

      req.media = media
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async getMedia (req, res, next) {
    try {
      return apiResponse.success(res, req.media)
    } catch (error) {
      return next(error)
    }
  }

  async updateMedia (req, res, next) {
    try {
      const { media } = req

      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        is_active: Joi.boolean().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const updateMediaInfo = { ...validater.value }

      const { Column, Task } = modelFactory.getAllModels()
      /** Get task include column info for log purpose */
      const taskInfo = await Task.findByPk(media.task_id, {
        attributes: ['id', 'title'],
        include: {
          model: Column,
          attributes: ['id', 'project_id']
        }
      })

      const logMessage = logUpdate(updateMediaInfo, media)
      await logController.logActivity(
        req.author,
        constant.LOG_ACTION.UPDATE,
        `${req.author.name} updated media: ${logMessage}`,
        taskInfo.Column.project_id
      )

      /** Update media info */
      const updatedMedia = await media.update(updateMediaInfo)

      /** Return new media info */
      return apiResponse.success(res, updatedMedia)
    } catch (error) {
      return next(error)
    }
  }

  async deleteMedia (req, res, next) {
    try {
      const { media } = req
      const { Column, Task, UserProject } = modelFactory.getAllModels()
      /** Get task include column info for delete media */
      const taskInfo = await Task.findByPk(media.task_id, {
        attributes: ['id'],
        include: [{
          model: Column,
          attributes: ['id', 'project_id']
        }]
      })

      const userProjectInfo = await UserProject.findOne({
        where: {
          project_id: taskInfo.Column.project_id
        }
      })
      if (!userProjectInfo || userProjectInfo.is_deleted) {
        return next(new APIError('You are not in this project', httpStatus.BAD_REQUEST))
      }

      /** Log user activity */
      const fileName = media.media_location.split('\\').pop().split('/').pop().split('_').pop()
      await logController.logActivity(
        req.author,
        constant.LOG_ACTION.REMOVE,
        `${req.author.name} removed media: [Title] ${media.title}, [File] ${fileName}`,
        taskInfo.Column.project_id
      )

      /** Delete media */
      const removeMedia = await media.update({ is_deleted: true })
      return apiResponse.success(res, removeMedia)
    } catch (error) {
      return next(error)
    }
  }

  async listMedia (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        media_location: Joi.string().optional(),
        task_id: Joi.number().optional(),
        created_by: Joi.number().optional(),
        is_active: Joi.boolean().optional(),
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

      const { task } = req
      /** Get list of media */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const Media = modelFactory.getModel(constant.DB_MODEL.MEDIA)
      const medias = await Media.findAndCountAll({
        where: {
          ...filter, is_deleted: false, task_id: task.id
        },
        order: [[sort, direction]],
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        offset: queryOffset,
        limit: queryLimit
      })

      return apiResponse.success(res, util.paginate(medias, page, offset))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new MediaController()

const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const { Op } = require('sequelize')
const fs = require('fs')

class MediaController {
  async addMedia (req, res, next) {
    try {
      const { task, author, file } = req

      /** Check when file is not uploaded */
      if (!req.file) return next(new APIError('Please add a file'), httpStatus.BAD_REQUEST)
      const mediaName = file.originalname.slice(0, file.originalname.lastIndexOf('.'))

      /** Validate input */
      const schema = Joi.object().keys({
        title: Joi.string().required().max(255)
      })

      const validater = Joi.validate({ title: mediaName }, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_GATEWAY))

      const Media = modelFactory.getModel(constant.DB_MODEL.MEDIA)
      const newMediaInfo = {
        ...validater.value,
        media_location: file.path,
        task_id: task.id,
        created_by: author.id
      }

      /** Create new media */
      const media = await Media.create({ ...newMediaInfo })
      return apiResponse.success(res, media)
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
      const { media, file } = req

      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        is_active: Joi.boolean().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const updateMediaInfo = { ...validater.value }

      /** If has file sent => update media */
      if (file) {
        updateMediaInfo.media_location = file.path
      }

      /** Remove old media file */
      if (updateMediaInfo.media_location && media.media_location) {
        fs.unlink(media.media_location, () => {})
      }

      /** Update media info */
      const updatedMedia = await media.update(updateMediaInfo)

      /** Return new media info */
      return apiResponse.success(res, updatedMedia)
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

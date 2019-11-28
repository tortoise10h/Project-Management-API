const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const { Op } = require('sequelize')
const logController = require('./log.controller')
const { logUpdate } = require('../lib/log-message')
const { sendMail } = require('./../services/email')
const columnController = require('./column.controller')

const compareTaskIndex = (a, b) => {
  if (a.index > b.index) {
    return 1
  }
  if (a.index < b.index) {
    return -1
  }
  return 0
}

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
      const { Project, UserProject } = modelFactory.getAllModels()

      /** Validate Duplicate */
      const newProjectInfo = { ...validater.value }
      newProjectInfo.owner = author.id

      const sequelize = modelFactory.getConnection()
      /** Create new project */
      const newProject = await sequelize.transaction(async (t) => {
        const result = await Project.create({ ...newProjectInfo }, { transaction: t })
        await UserProject.create({
          user_id: author.id,
          project_id: result.id,
          role: constant.USER_ROLE.ADMIN
        }, { transaction: t })
        return result
      })
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

  async getProject (req, res, next) {
    try {
      const { project } = req

      const { User, Project } = modelFactory.getAllModels()
      let projectInfo = await Project.findOne({
        where: {
          id: project.id,
          is_deleted: false
        },
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        include: [{
          model: User,
          attributes: {
            exclude: [...constant.UNNECESSARY_FIELDS, 'password']
          }
        }]
      })
      projectInfo = projectInfo.toJSON()
      /** Remove user project field */
      projectInfo.Users = projectInfo.Users.map((user) => {
        delete user.UserProject
        return user
      })
      return apiResponse.success(res, projectInfo)
    } catch (error) {
      return next(error)
    }
  }

  async updateProject (req, res, next) {
    try {
      const { project, author } = req

      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        description: Joi.string().optional(),
        status: Joi.string().optional().max(255),
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      /** Log activity of user */
      const logMessage = logUpdate(validater.value, project)
      await logController.logActivity(
        author,
        constant.LOG_ACTION.UPDATE,
        `${author.name} updated project: ${logMessage}`,
        project.id
      )

      /** Update project info */
      const updatedProject = await project.update({ ...validater.value })

      /** Return new project update info */
      return apiResponse.success(res, updatedProject)
    } catch (error) {
      return next(error)
    }
  }

  async deleteProject (req, res, next) {
    try {
      const { author, project } = req

      const {
        Column, Label, Task, UserProject, User,
        Log
      } = modelFactory.getAllModels()

      /** Validate user in project */
      const userProjectInfo = await UserProject.findOne({
        where: {
          user_id: author.id,
          project_id: project.id
        }
      })
      if (!userProjectInfo || userProjectInfo.is_deleted) {
        return next(new APIError('You are not in this project'), httpStatus.UNAUTHORIZED)
      }

      /** Validate owner of project */
      if (author.id !== project.owner) {
        return next(new APIError('You don\'t have a permission'), httpStatus.UNAUTHORIZED)
      }

      /** Map user in project for delete */
      const userInfo = await UserProject.findAll({
        where: { project_id: project.id, is_deleted: false },
        attributes: ['user_id']
      })
      const userInfoId = userInfo.map(user => user.user_id)

      const userMailInfo = await User.findAll({
        where: { id: { [Op.in]: userInfoId }, is_deleted: false },
        attributes: ['email']
      })
      const userMail = userMailInfo.map(user => user.email).toString()

      /** Map column in project for delete */
      const columnInfo = await Column.findAll({
        where: { project_id: project.id, is_deleted: false },
        attributes: ['id']
      })
      const columnInfoId = columnInfo.map(column => column.id)

      /** Map label in project for delete */
      const labelInfo = await Label.findAll({
        where: { project_id: project.id, is_deleted: false },
        attributes: ['id']
      })
      const labelInfoId = labelInfo.map(label => label.id)

      /** Map task in project for delete */
      const taskInfo = await Task.findAll({
        where: { column_id: { [Op.in]: columnInfoId }, is_deleted: false },
        attributes: ['id']
      })
      const taskInfoId = taskInfo.map(task => task.id)

      const sequelize = modelFactory.getConnection()
      const result = await sequelize.transaction(async (t) => {
        /** Delete all label */
        await Label.update(
          { is_deleted: true },
          {
            where: { id: { [Op.in]: labelInfoId } }
          },
          { transaction: t }
        )

        /** Delete all log */
        await Log.update(
          { is_deleted: true },
          {
            where: { project_id: project.id }
          },
          { transaction: t }
        )

        /** Delete all column and related task */
        await columnController.deleteColumns(columnInfoId, author)

        /** Delete all user in project */
        await UserProject.update(
          { is_deleted: true },
          {
            where: {
              user_id: { [Op.in]: userInfoId },
              project_id: project.id
            }
          },
          { transaction: t }
        )

        /** Delete project */
        await project.update({
          is_deleted: true
        })

        /** Send removed project mail to all member */
        await sendMail(
          'removeProject',
          {
            authorName: author.name,
            projectName: project.title,
            projectId: project.id,
            date: project.deletedAt
          },
          {
            to: userMail,
            subject: `[Banana Boys] '${project.title}' has been deleted.`
          }
        )

        return { is_deleted: true }
      })

      return apiResponse.success(res, result)
    } catch (error) {
      return next(error)
    }
  }

  async listProject (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        description: Joi.string().optional(),
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional(),
        status: Joi.string().optional().max(255),
        is_active: Joi.boolean().optional(),
        owner: Joi.number().optional(),
        sort: Joi.string().optional().default('title'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC']).default('ASC'),
        is_favorite: Joi.boolean().optional(),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET).default(constant.SERVER.API_DEFAULT_OFFSET)
      })
      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        sort, direction, page, offset, is_favorite: isFavorite
      } = validater.value

      const { author } = req

      /** Map search */
      const filter = {}
      Object.keys(validater.value).forEach((key) => {
        if (!['sort', 'direction', 'page', 'offset', 'is_favorite'].includes(key)) {
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

      const userProjectWhere = {
        user_id: author.id,
        is_deleted: false
      }

      if (isFavorite) userProjectWhere.is_favorite = isFavorite

      /** Get list of project */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const { Project, User, UserProject } = modelFactory.getAllModels()
      const projects = await Project.findAndCountAll({
        where: {
          ...filter, is_deleted: false
        },
        distinct: true,
        order: [[sort, direction]],
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: [...constant.UNNECESSARY_FIELDS, 'password']
            }
          },
          {
            model: UserProject,
            require: true,
            where: { ...userProjectWhere }
          }
        ],
        offset: queryOffset,
        limit: queryLimit
      })

      projects.rows = projects.rows.map((project) => {
        project = project.toJSON()
        /** Remove user project field */
        project.Users = project.Users.map((user) => {
          delete user.UserProject
          return user
        })
        project.is_favorite = project.UserProjects[0].is_favorite
        project.user_role = project.UserProjects[0].role
        delete project.UserProjects
        return project
      })

      return apiResponse.success(res, util.paginate(projects, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async listKanbanInfo (req, res, next) {
    try {
      /** Get list of tasks */
      const { Column, Task } = modelFactory.getAllModels()
      const { project } = req

      let result = await Column.findAll({
        where: {
          is_deleted: false,
          project_id: project.id
        },
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        include: [
          {
            model: Task,
            where: {
              is_deleted: false
            },
            required: false,
            attributes: {
              exclude: constant.UNNECESSARY_FIELDS
            }
          }
        ],
        order: [['createdAt', 'asc']]
      })

      /** Sort tasks in each column by index ascending */
      result = result.map((column) => {
        column.Tasks = column.Tasks.sort(compareTaskIndex)
        return column
      })
      return apiResponse.success(res, result)
    } catch (error) {
      return next(error)
    }
  }

  async leaveProject (req, res, next) {
    try {
      const { project, author } = req
      const UserProject = modelFactory.getModel(constant.DB_MODEL.USER_PROJECT)

      /** Validate user is in project */
      const oldUserProject = await UserProject.findOne({
        where: {
          user_id: author.id,
          project_id: project.id
        }
      })
      if (!oldUserProject || oldUserProject.is_deleted) {
        return next(new APIError('You are not in that project', httpStatus.BAD_REQUEST))
      }

      /** Remove user out of project */
      await UserProject.destroy(
        {
          where: {
            user_id: author.id,
            project_id: project.id
          }
        }
      )

      return apiResponse.success(res, `You have leaved project ${project.name} successfully`)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new ProjectController()

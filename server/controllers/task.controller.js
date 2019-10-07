const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')

const { Op } = require('sequelize')

const processAddUsersToTask = async (task, userIds, author) => {
  const UserTask = modelFactory.getModel(constant.DB_MODEL.USER_TASK)
  const addSingleUserToProject = userId => new Promise(async (resolve) => {
    try {
      /** validate if user already in task */
      const oldUserTask = await UserTask.findOne({
        where: {
          task_id: task.id,
          user_id: userId
        }
      })
      if (oldUserTask) return resolve({ field: 'userId', value: userId, message: `User ${userId} is already in this task` })

      /** Add user to task */
      const newUserTask = await UserTask.create({
        task_id: task.id,
        user_id: userId,
        added_by: author.id
      })
      return resolve([null, newUserTask])
    } catch (error) {
      return resolve(error)
    }
  })
  return Promise.all(userIds.map(userId => addSingleUserToProject(userId)))
}

const processUpdateTasksIndex = async (tasks) => {
  const Task = modelFactory.getModel(constant.DB_MODEL.TASK)
  const updateIndexOfSingleTask = task => new Promise(async (resolve) => {
    try {
      /** Update index of task */
      const taskWithNewIndex = await Task.update(
        {
          index: task.index
        },
        {
          where: {
            id: task.id
          }
        }
      )
      return resolve([null, taskWithNewIndex])
    } catch (error) {
      return resolve(error)
    }
  })
  return Promise.all(tasks.map(task => updateIndexOfSingleTask(task)))
}

class TaskController {
  async listTask (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        column_id: Joi.string().optional(),
        due_date: Joi.date().optional(),
        sort: Joi.string().optional().default('title'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC'),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
        is_active: Joi.boolean().optional()
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

      /** If in request have column instance => just get tasks of that column */
      const { column } = req
      if (column) {
        filter.column_id = column.id
      }

      /** Get list of tasks */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const { User, Task } = modelFactory.getAllModels()
      const tasks = await Task.findAndCountAll({
        where: { ...filter, is_deleted: false },
        order: [[sort, direction]],
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: constant.UNNECESSARY_FIELDS
            }
          }
        ],
        offset: queryOffset,
        limit: queryLimit
      })

      return apiResponse.success(res, tasks)
    } catch (error) {
      return next(error)
    }
  }

  async addTask (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required().max(255),
        description: Joi.string().optional()
      })

      const { author, column } = req
      /** Validate Input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const Task = modelFactory.getModel(constant.DB_MODEL.TASK)

      /** Create new task */
      const newTask = await Task.create({
        ...validater.value,
        created_by: author.id,
        column_id: column.id
      })
      return apiResponse.success(res, newTask)
    } catch (error) {
      return next(error)
    }
  }

  async loadTask (req, res, next, taskId) {
    try {
      /** Validate project id */
      const id = parseInt(taskId)
      if (_.isNaN(id)) return next(new APIError([{ field: 'taskId', value: taskId, message: 'Invalid task id' }], httpStatus.BAD_REQUEST))

      /** Validate existed */
      const { Task, User } = modelFactory.getAllModels()
      const task = await Task.findByPk(id, {
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: constant.UNNECESSARY_FIELDS
            }
          }
        ]
      })
      if (!task || task.is_deleted) return next(new APIError('Task not found', httpStatus.BAD_REQUEST))
      req.task = task
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async getTask (req, res, next) {
    try {
      return apiResponse.success(res, req.task)
    } catch (error) {
      return next(error)
    }
  }

  async updateTask (req, res, next) {
    try {
      const { task } = req

      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        description: Joi.string().optional(),
        column_id: Joi.number().optional().min(1),
        due_date: Joi.date().optional(),
        index: Joi.number().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      /** Update task info */
      const updatedTask = await task.update({ ...validater.value })

      /** Return new task update info */
      return apiResponse.success(res, updatedTask)
    } catch (error) {
      return next(error)
    }
  }

  async addUserToTask (req, res, next) {
    try {
      const schema = Joi.object().keys({
        user_ids: Joi.array().required().items(Joi.number()).min(1)
      })

      const { author, task } = req
      /** Validate Input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      let { user_ids: userIds } = validater.value
      userIds = _.uniq(userIds)

      const successList = []
      const failedList = []
      const addUserToTaskResult = await processAddUsersToTask(task, userIds, author)
      /** Loop through the result if user was failed than push to failed list else push to success list */
      addUserToTaskResult.forEach((data) => {
        if (data[0]) return failedList.push(data[0])
        return successList.push(data[1])
      })

      return apiResponse.success(res, { success_list: successList, failed_list: failedList })
    } catch (error) {
      return next(error)
    }
  }

  async removeUserFromTask (req, res, next) {
    try {
      const schema = Joi.object().keys({
        user_id: Joi.number().required().min(1)
      })

      const { task } = req
      /** Validate Input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { user_id: userId } = validater.value
      const { UserTask, User } = modelFactory.getAllModels()

      /** Validate user is in task */
      const oldUser = await User.findByPk(userId)
      if (!oldUser) return next(new APIError({ field: 'userId', value: userId, message: 'This user is not in this task' }, httpStatus.BAD_REQUEST))

      /** Remove user from task */
      await UserTask.destroy({
        where: {
          user_id: userId,
          task_id: task.id
        }
      })

      return apiResponse.success(res, 'Deleted successfully')
    } catch (error) {
      return next(error)
    }
  }

  async updateManyTaskIndex (req, res, next) {
    try {
      const schema = Joi.object().keys({
        tasks: Joi.array().required().items(Joi.object().keys({
          id: Joi.number().required(),
          index: Joi.number().required()
        }))
          .min(1)
      })

      /** Validate Input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { tasks } = validater.value

      const successList = []
      const failedList = []
      const updateTasksIndexResult = await processUpdateTasksIndex(tasks)
      updateTasksIndexResult.forEach((data) => {
        if (data[0]) return failedList.push(data[0])
        return successList.push(data[1])
      })

      return apiResponse.success(res, { success_list: successList, failed_list: failedList })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new TaskController()

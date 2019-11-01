const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const logController = require('./log.controller')
const { logUpdate, logAddMany } = require('../lib/log-message')

const { Op } = require('sequelize')

const processAddUsersToTask = async (task, userIds, author) => {
  const { UserTask, User, UserProject, Column } = modelFactory.getAllModels()
  /** Get column info to know the project of task */
  const columnInfo = await Column.findByPk(task.column_id, {
    attributes: ['project_id']
  })
  const addSingleUserToTask = userId => new Promise(async (resolve) => {
    try {
      /** validate if user already in task */
      const oldUserTask = await UserTask.findOne({
        where: {
          task_id: task.id,
          user_id: userId
        }
      })
      if (oldUserTask) return resolve([{ field: 'userId', value: userId, message: 'User is already in this task' }])
      /** Validate user is valid */
      const userInfo = await User.findByPk(userId, {
        include: [{
          model: UserProject,
          required: true,
          where: { project_id: columnInfo.project_id }
        }]
      })
      if (!userInfo || userInfo.is_deleted) return resolve([{ field: 'userId', value: userId, message: 'User is not valid' }])

      /** Add user to task */
      const newUserTask = await UserTask.create({
        task_id: task.id,
        user_id: userId,
        added_by: author.id
      })
      /** Add name to return result to log activity */
      newUserTask.name = userInfo.name
      return resolve([null, newUserTask])
    } catch (error) {
      return resolve(error)
    }
  })
  return Promise.all(userIds.map(userId => addSingleUserToTask(userId)))
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
        estimated_time: Joi.number().optional().min(1),
        estimated_time_unit: Joi.string().optional(),
        spent_time: Joi.number().optional(),
        spent_time_unit: Joi.string().optional(),
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

  async getUsersOfTask (req, res, next) {
    try {
      const { task } = req
      const {
        UserTask,
        Column,
        Project,
        User,
        UserProject
      } = modelFactory.getAllModels()
      /** Get column of task to get project id to validate only get user in project */
      const columnInfo = await Column.findByPk(task.column_id, {
        include: [{
          model: Project,
          attributes: ['id']
        }],
        attributes: ['id']
      })

      /** Get all user of project
       * include UserTask to check they are in task or not
       * include UserProject to make sure only get users in project
      */
      let users = await User.findAll({
        where: {
          is_deleted: false
        },
        attributes: {
          exclude: [...constant.UNNECESSARY_FIELDS, 'password']
        },
        include: [
          {
            model: UserTask,
            attributes: ['id', 'user_id'],
            where: { task_id: task.id },
            required: false
          },
          {
            model: UserProject,
            attributes: ['id', 'user_id'],
            where: { project_id: columnInfo.Project.id },
            required: true
          }
        ]
      })

      users = users.map((user) => {
        user = user.toJSON()
        user.is_in_task = false
        if (user.UserTasks.length > 0) {
          user.is_in_task = true
        }
        return user
      })

      return apiResponse.success(res, users)
    } catch (error) {
      return next(error)
    }
  }

  async getLabelsOfTask (req, res, next) {
    try {
      const { task } = req
      const {
        TaskLabel,
        Column,
        Project,
        Label
      } = modelFactory.getAllModels()
      /** Get column of task to get project id to check what labels are in project */
      const columnInfo = await Column.findByPk(task.column_id, {
        include: [{
          model: Project,
          attributes: ['id']
        }],
        attributes: ['id']
      })

      /** Get all label of project
       * include TaskLabel to check label is in task or not
      */
      let labels = await Label.findAll({
        where: {
          is_deleted: false,
          project_id: columnInfo.Project.id
        },
        attributes: {
          exclude: constant.UNNECESSARY_FIELDS
        },
        include: [
          {
            model: TaskLabel,
            attributes: ['id', 'label_id'],
            where: { task_id: task.id },
            required: false
          }
        ]
      })

      labels = labels.map((label) => {
        label = label.toJSON()
        label.is_in_task = false
        if (label.TaskLabels.length > 0) {
          label.is_in_task = true
        }
        return label
      })

      return apiResponse.success(res, labels)
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
      /** Log user activity */
      await logController.logActivity(
        author,
        constant.LOG_ACTION.ADD,
        `${author.name} created new task "${newTask.title}"`,
        column.project_id
      )
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
        estimated_time: Joi.number().optional(),
        estimated_time_unit: Joi.string().optional().valid([constant.TIME_UNIT.DAY, constant.TIME_UNIT.HOUR, constant.TIME_UNIT.MINUTE]),
        spent_time: Joi.number().optional(),
        spent_time_unit: Joi.string().optional().valid([constant.TIME_UNIT.DAY, constant.TIME_UNIT.HOUR, constant.TIME_UNIT.MINUTE]),
        due_date: Joi.date().optional(),
        index: Joi.number().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { column_id: columnId } = validater.value
      const Column = modelFactory.getModel(constant.DB_MODEL.COLUMN)

      /** Validate time must have a unit */
      const {
        estimated_time: estimatedTime,
        estimated_time_unit: estimatedTimeUnit,
        spent_time: spentTime,
        spent_time_unit: spentTimeUnit
      } = validater.value

      const Task = modelFactory.getModel(constant.DB_MODEL.TASK)
      const taskInfo = await Task.findByPk(task.id)

      if (estimatedTime && (_.isEmpty(taskInfo.estimated_time_unit) && _.isEmpty(estimatedTimeUnit))) return next(new APIError('Time must have a unit'), httpStatus.BAD_REQUEST)
      if (spentTime && (_.isEmpty(taskInfo.spent_time_unit) && _.isEmpty(spentTimeUnit))) return next(new APIError('Time must have a unit'), httpStatus.BAD_REQUEST)

      /** Update task info */
      const updatedTask = await task.update({ ...validater.value })

      /** Get column info with task id get project id to log activity */
      const columnInfo = await Column.findByPk(task.column_id, {
        attributes: ['project_id', 'title']
      })

      /** Log user activity */
      if (columnId) {
        /** If column_id exists => task was moved then log different message than normal update */
        const newColumnInfo = await Column.findByPk(columnId, {
          attributes: ['title']
        })
        await logController.logActivity(
          req.author,
          constant.LOG_ACTION.MOVE_TASK,
          `${req.author.name} moved task "${task.title}" from column "${columnInfo.title}" to column "${newColumnInfo.title}"`,
          columnInfo.project_id
        )
      } else {
        const logMessage = logUpdate(validater.value, task)
        await logController.logActivity(
          req.author,
          constant.LOG_ACTION.UPDATE,
          `${req.author.name} updated task: ${logMessage}`,
          columnInfo.project_id
        )
      }

      /** Return new task update info */
      return apiResponse.success(res, updatedTask)
    } catch (error) {
      return next(error)
    }
  }

  async addUsersToTask (req, res, next) {
    try {
      const schema = Joi.object().keys({
        user_ids: Joi.array().required().items(Joi.number()).min(1)
      })
      const Column = modelFactory.getModel(constant.DB_MODEL.COLUMN)
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

      /** Get column from task id get project id to log activity */
      const columnInfo = await Column.findByPk(task.column_id, {
        attributes: ['project_id']
      })
      /** Log user activity */
      if (successList.length > 0) {
        console.log('============> Huy Debugs :>: TaskController -> addUsersToTask -> successList', successList)
        const logMessage = logAddMany(successList, 'name')
        await logController.logActivity(
          author,
          constant.LOG_ACTION.ADD,
          `${author.name} added: ${logMessage} to task`,
          columnInfo.project_id
        )
      }

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
      const { UserTask, Column } = modelFactory.getAllModels()

      /** Validate user is in task */
      const oldUser = await UserTask.findOne({
        where: {
          user_id: userId,
          task_id: task.id
        }
      })
      if (!oldUser) return next(new APIError({ field: 'userId', value: userId, message: 'This user is not in this task' }, httpStatus.BAD_REQUEST))

      /** Remove user from task */
      await UserTask.destroy({
        where: {
          user_id: userId,
          task_id: task.id
        }
      })

      /** Get column from task id get project id to log activity */
      const columnInfo = await Column.findByPk(task.column_id, {
        attributes: ['project_id']
      })

      /** Log user activity */
      await logController.logActivity(
        req.author,
        constant.LOG_ACTION.REMOVE,
        `${req.author.name} removed: "${oldUser.name}" from task "${task.title}"`,
        columnInfo.project_id
      )

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

  async manageTaskLabel (req, res, next) {
    try {
      const { task } = req
      const schema = Joi.object().keys({
        label_id: Joi.number().min(1).required(),
        is_in_task: Joi.boolean().required()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const { label_id: labelId, is_in_task: isInTask } = validater.value

      /** Validate duplicate label */
      const { Label, TaskLabel } = modelFactory.getAllModels()

      /** Validate exists label */
      const labelInfo = await Label.findByPk(labelId)
      if (!labelInfo || labelInfo.is_deleted) return next(new APIError('Label not found', httpStatus.BAD_REQUEST))

      /** if isInTask = true => create new task label
       * isInTask = false => destroy task label
      */
      let result
      if (isInTask) {
        /** If option is create new task then check if label is already exists in task or not */
        const taskLabelInfo = await TaskLabel.findOne({
          where: {
            task_id: task.id,
            label_id: labelId
          }
        })
        if (taskLabelInfo) return next(new APIError('Label is already existed in task', httpStatus.BAD_REQUEST))

        /** prepare required info of new task label and create */
        const newTaskLabelInfo = { ...validater.value }
        newTaskLabelInfo.task_id = task.id
        result = await TaskLabel.create({ ...newTaskLabelInfo })
      } else {
        /** Option is remove task label */
        await TaskLabel.destroy({
          where: {
            task_id: task.id,
            label_id: labelId
          }
        })
        result = { is_deleted: true }
      }
      return apiResponse.success(res, result)
    } catch (error) {
      return next(error)
    }
  }

  async manageUserTask (req, res, next) {
    try {
      const { task, author } = req
      const schema = Joi.object().keys({
        user_id: Joi.number().min(1).required(),
        is_in_task: Joi.boolean().required()
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const { user_id: userId, is_in_task: isInTask } = validater.value

      /** Validate duplicate label */
      const { User, UserTask } = modelFactory.getAllModels()

      /** Validate exists user */
      const userInfo = await User.findByPk(userId)
      if (!userInfo || userInfo.is_deleted) return next(new APIError('User not found', httpStatus.BAD_REQUEST))

      /** if isInTask = true => create new user task
       * isInTask = false => destroy user task
      */
      let result
      if (isInTask) {
        /** If option is create new user task then check if user is already exists in task or not */
        const userTaskInfo = await UserTask.findOne({
          where: {
            task_id: task.id,
            user_id: userId
          }
        })
        if (userTaskInfo) return next(new APIError('User is already existed in task', httpStatus.BAD_REQUEST))

        /** prepare required info of new user task and create */
        const newUserTaskInfo = { ...validater.value }
        newUserTaskInfo.task_id = task.id
        newUserTaskInfo.added_by = author.id
        result = await UserTask.create({ ...newUserTaskInfo })
      } else {
        /** Option is remove user task */
        await UserTask.destroy({
          where: {
            task_id: task.id,
            user_id: userId
          }
        })
        result = { is_deleted: true }
      }
      return apiResponse.success(res, result)
    } catch (error) {
      return next(error)
    }
  }

  async listUsersNotInTask (req, res, next) {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        phone: Joi.string().optional(),
        birthday: Joi.date().optional(),
        address: Joi.string().optional(),
        profile_title: Joi.string().optional(),
        sort: Joi.string().optional().default('name'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC'),
        is_active: Joi.boolean().optional()
      })

      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        sort, direction
      } = validater.value

      const { User, UserTask, Column, UserProject } = modelFactory.getAllModels()
      const { task } = req

      /** Map search */
      const filter = {}
      Object.keys(validater.value).forEach((key) => {
        if (!['sort', 'direction', 'page', 'offset'].includes(key)) {
          switch (typeof validater.value[key]) {
            case 'string':
              filter[key] = { [Op.like]: `%${validater.value[key]}%` }
              break
            default:
              break
          }
        }
      })

      /** Get list user in task */
      const usersInTask = await UserTask.findAll({
        where: { task_id: task.id, is_deleted: false },
        attributes: ['id', 'user_id']
      })
      const userInTaskIds = usersInTask.map(value => value.user_id)

      /** Get column info to know the project of task */
      const columnInfo = await Column.findByPk(task.column_id, {
        attributes: ['project_id']
      })

      /** Get list of user */
      const users = await User.findAll({
        where: {
          ...filter,
          is_deleted: false,
          id: { [Op.notIn]: userInTaskIds }
        },
        order: [[sort, direction]],
        attributes: {
          exclude: [...constant.UNNECESSARY_FIELDS, 'password']
        },
        include: [
          {
            model: UserProject,
            required: true,
            where: { project_id: columnInfo.project_id }
          },
          {
            model: UserTask,
            required: true,
            where: { task_id: task.id }
          }
        ]
      })

      return apiResponse.success(res, users)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new TaskController()

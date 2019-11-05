const httpStatus = require('http-status')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const { APIError, apiResponse } = require('../helpers')
const { constant, util } = require('../../common')
const modelFactory = require('../models')
const { Op } = require('sequelize')
const logController = require('./log.controller')
const { logUpdate, logAddMany } = require('../lib/log-message')

class TodoController {
  async addTodo (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required().max(255)
      })
      const { author, task } = req

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))

      const { Todo, Task, Column } = modelFactory.getAllModels()
      const newTodoInfo = { ...validater.value }
      newTodoInfo.created_by = author.id
      newTodoInfo.task_id = task.id

      /** Create new todo */
      const todo = await Todo.create({ ...newTodoInfo })
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
        author,
        constant.LOG_ACTION.ADD,
        `${author.name} created new to do "${todo.title}"`,
        taskInfo.Column.project_id
      )
      return apiResponse.success(res, todo)
    } catch (error) {
      return next(error)
    }
  }

  async loadTodo (req, res, next, todoId) {
    try {
      /** Validate todo id */
      const id = parseInt(todoId)
      if (_.isNaN(id)) return next(new APIError([{ field: 'todoId', value: todoId, message: 'Invalid todo' }], httpStatus.BAD_REQUEST))

      /** Validate existed */
      const { Todo } = modelFactory.getAllModels()
      const todo = await Todo.findByPk(id)
      if (!todo || todo.is_deleted) return next(new APIError('Todo not found', httpStatus.BAD_REQUEST))

      req.todo = todo
      return next()
    } catch (error) {
      return next(error)
    }
  }

  async getTodo (req, res, next) {
    try {
      return apiResponse.success(res, req.todo)
    } catch (error) {
      return next(error)
    }
  }

  async updateTodo (req, res, next) {
    try {
      const { todo, author } = req

      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        status: Joi.boolean().optional().max(255)
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const { Column, Task } = modelFactory.getAllModels()

      /** Update todo info */
      const updatedTodo = await todo.update({ ...validater.value })
      /** Get task include column info for log purpose */
      const taskInfo = await Task.findByPk(todo.task_id, {
        attributes: ['id', 'title'],
        include: {
          model: Column,
          attributes: ['id', 'project_id']
        }
      })

      /** Update column info */
      const logMessage = logUpdate(validater.value, todo)
      await logController.logActivity(
        req.author,
        constant.LOG_ACTION.UPDATE,
        `${req.author.name} updated todo: ${logMessage}`,
        taskInfo.Column.project_id
      )

      /** Return new todo info */
      return apiResponse.success(res, updatedTodo)
    } catch (error) {
      return next(error)
    }
  }

  async listTodo (req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().optional().max(255),
        status: Joi.boolean().optional().max(255),
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
      /** Get list of todo */
      const queryOffset = (page - 1) * offset
      const queryLimit = offset
      const Todo = modelFactory.getModel(constant.DB_MODEL.TODO)
      const todos = await Todo.findAndCountAll({
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

      return apiResponse.success(res, util.paginate(todos, page, offset))
    } catch (error) {
      return next(error)
    }
  }

  async checkListTodo (req, res, next) {
    try {
      const schema = Joi.object().keys({
        todo_ids: Joi.array().required().items(Joi.number()).min(1)
      })

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false })
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST))
      const {
        todo_ids: todoIds
      } = validater.value
      const { task } = req
      const { Todo, UserProject, Column, Task } = modelFactory.getAllModels()

      /** Validate user has to in project to check todo */
      const taskInfo = await Task.findOne({
        where: { id: task.id },
        attributes: ['id'],
        include: [{
          model: Column,
          attributes: ['id', 'project_id']
        }]
      })

      const userProjectInfo = await UserProject.findOne({ where: { project_id: taskInfo.Column.project_id } })
      if (!userProjectInfo || userProjectInfo.is_deleted) {
        return next(new APIError('You are not in this project', httpStatus.BAD_REQUEST))
      }

      await Todo.update(
        {
          status: false
        },
        {
          where: {
            task_id: task.id
          }
        }
      )
      /** Change to do in todoIds to true */
      await Todo.update(
        {
          status: true
        },
        {
          where: {
            task_id: task.id,
            id: { [Op.in]: todoIds }
          }
        }
      )

      return apiResponse.success(res, { success: true })
    } catch (error) {
      return next(error)
    }
  }

  async deleteTodo (req, res, next) {
    try {
      const { todo } = req
      const { Task, UserProject, Column } = modelFactory.getAllModels()
      /** Validate user has to in project to check todo */
      const taskInfo = await Task.findOne({
        where: { id: todo.task_id },
        attributes: ['id'],
        include: [{
          model: Column,
          attributes: ['id', 'project_id']
        }]
      })

      const userProjectInfo = await UserProject.findOne({ where: { project_id: taskInfo.Column.project_id } })
      if (!userProjectInfo || userProjectInfo.is_deleted) {
        return next(new APIError('You are not in this project', httpStatus.BAD_REQUEST))
      }
      /** Delete todo */
      const result = await todo.update({ is_deleted: true })
      return apiResponse.success(res, result)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new TodoController()

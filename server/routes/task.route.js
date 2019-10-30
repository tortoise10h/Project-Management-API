const taskController = require('../controllers/task.controller')
const authorController = require('../controllers/auth.controller')
const todoController = require('../controllers/todo.controller')

const express = require('express')
const router = express.Router()

router.route('/')
  /** GET api/task - list all project in system */
  .get(authorController.validate, taskController.listTask)

router.route('/updateIndex')
  /** GET api/task/updateIndex - update index of task */
  .put(authorController.validate, taskController.updateManyTaskIndex)

router.route('/:taskId')
  /** GET api/task - update task */
  .put(authorController.validate, taskController.updateTask)

router.route('/:taskId/todo')
  /** POST api/task/:taskId/todo - add todo */
  .post(authorController.validate, todoController.addTodo)
  /** GET api/task/:taskId/todo - list all todo in system, can filter */
  .get(authorController.validate, todoController.listTodo)

router.route('/:taskId/user')
  /** GET api/task/:taskId/user - Get users of task */
  .get(authorController.validate, taskController.getUsersOfTask)

  /** POST api/task/:taskId/user - Manage user task */
  .post(authorController.validate, taskController.manageUserTask)

router.route('/:taskId/label')
  /** GET api/task/:taskId/labels - Get labels of task */
  .get(authorController.validate, taskController.getLabelsOfTask)

  /** POST api/task/:taskId/label - Manage task label */
  .post(authorController.validate, taskController.manageTaskLabel)

router.param('taskId', taskController.loadTask)

module.exports = router

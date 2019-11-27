const taskController = require('../controllers/task.controller')
const authorController = require('../controllers/auth.controller')
const todoController = require('../controllers/todo.controller')
const mediaController = require('../controllers/media.controller')
const upload = require('../lib/upload')

const express = require('express')
const router = express.Router()

router.route('/')
  /** GET api/task - list all project in system */
  .get(authorController.validate, taskController.task.listTask)

router.route('/updateIndex')
  /** GET api/task/updateIndex - update index of task */
  .put(authorController.validate, taskController.task.updateManyTaskIndex)

router.route('/:taskId')
  /** PUT api/task/:taskId - update task */
  .put(authorController.validate, taskController.task.updateTask)

  /** PUT api/task/:taskId - get task */
  .get(authorController.validate, taskController.task.getTask)

  /** DELETE api/task/:taskId - delete task */
  .delete(authorController.validate, taskController.task.deleteTask)

router.route('/:taskId/todo')
  /** POST api/task/:taskId/todo - add todo */
  .post(authorController.validate, todoController.addTodo)

  /** GET api/task/:taskId/todo - list all todo in system, can filter */
  .get(authorController.validate, todoController.listTodo)

router.route('/:taskId/todo-status')
  /** POST api/task/:taskId/todo-status - check list todo */
  .post(authorController.validate, todoController.checkListTodo)

router.route('/:taskId/user-not-in')
  /** GET api/task/:taskId/user-not-in - Get users not in task */
  .get(authorController.validate, taskController.task.listUsersNotInTask)

router.route('/:taskId/user')
  /** GET api/task/:taskId/user - Get users of task */
  .get(authorController.validate, taskController.task.getUsersOfTask)

  /** POST api/task/:taskId/user - Add users to task */
  .post(authorController.validate, taskController.task.addUsersToTask)

  /** DELETE api/task/:taskId/user - Delete user from task */
  .delete(authorController.validate, taskController.task.manageUserTask)

router.route('/:taskId/media')
  /** POST api/task/:taskId/media - add media */
  .post(authorController.validate, upload.taskMedia, mediaController.addMedia)
  /** GET api/task/:taskId/media - list all media in system, can filter */
  .get(authorController.validate, mediaController.listMedia)

router.route('/:taskId/label')
  /** GET api/task/:taskId/labels - Get labels of task */
  .get(authorController.validate, taskController.task.getLabelsOfTask)

  /** POST api/task/:taskId/label - Manage task label */
  .post(authorController.validate, taskController.task.manageTaskLabel)

router.param('taskId', taskController.task.loadTask)

module.exports = router

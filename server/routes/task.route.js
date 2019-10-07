const taskController = require('../controllers/task.controller')
const authorController = require('../controllers/auth.controller')
const columnController = require('../controllers/column.controller')

const userController = require('../controllers/user.controller')

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

router.param('taskId', taskController.loadTask)

module.exports = router

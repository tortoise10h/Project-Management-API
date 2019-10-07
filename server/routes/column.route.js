const express = require('express')
const router = express.Router()
const authorController = require('../controllers/auth.controller')
const columnController = require('../controllers/column.controller')
const taskController = require('../controllers/task.controller')

/** PUT api/project/:projectId - update project */
router.route('/:columnId')
  .put(authorController.validate, columnController.updateColumn)

router.route('/:columnId/task')
  /** POST /api/column/:columnId/task - Add new task to column */
  .post(authorController.validate, taskController.addTask)

router.param('columnId', columnController.loadColumn)

module.exports = router

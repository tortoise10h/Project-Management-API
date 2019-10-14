const express = require('express')
const router = express.Router()
const authorController = require('../controllers/auth.controller')
const columnController = require('../controllers/column.controller')
const taskController = require('../controllers/task.controller')

router.route('/:columnId')
  /** PUT /api/column/:columnId - update column */
  .put(authorController.validate, columnController.updateColumn)
  /** GET /api/column/:columnId - get column by id */
  .get(authorController.validate, columnController.getColumn)

router.route('/:columnId/task')
  /** POST /api/column/:columnId/task - Add new task to column */
  .post(authorController.validate, taskController.addTask)

router.param('columnId', columnController.loadColumn)

module.exports = router

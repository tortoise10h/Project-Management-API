const express = require('express')
const router = express.Router()
const authorController = require('../controllers/auth.controller')
const columnController = require('../controllers/column.controller')
const taskController = require('../controllers/task.controller')

router.route('/:columnId')
  /** PUT /api/column/:columnId - update column */
  .put(authorController.validate, columnController.column.updateColumn)

  /** GET /api/column/:columnId - get column by id */
  .get(authorController.validate, columnController.column.getColumn)

  /** DELETE /api/column/:columnId - delete column by id */
  .delete(authorController.validate, columnController.column.deleteColumn)

router.route('/:columnId/task')
  /** POST /api/column/:columnId/task - Add new task to column */
  .post(authorController.validate, taskController.task.addTask)

router.param('columnId', columnController.column.loadColumn)

module.exports = router

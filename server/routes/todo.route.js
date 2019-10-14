const express = require('express')
const router = express.Router()
const authorController = require('../controllers/auth.controller')
const todoController = require('../controllers/todo.controller')

router.route('/:todoId')
  /** PUT /api/todo/:todoId - update todo */
  .put(authorController.validate, todoController.updateTodo)
  /** GET /api/todo/:todoId - get todo by id */
  .get(authorController.validate, todoController.getTodo)

router.param('todoId', todoController.loadTodo)

module.exports = router

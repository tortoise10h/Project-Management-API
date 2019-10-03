const express = require('express')
const router = express.Router()
const authorController = require('../controllers/auth.controller')
const columnController = require('../controllers/column.controller')

/** PUT api/project/:projectId - update project */
router.route('/:columnId')
  .put(authorController.validate, columnController.updateColumn)

router.param('columnId', columnController.loadColumn)

module.exports = router

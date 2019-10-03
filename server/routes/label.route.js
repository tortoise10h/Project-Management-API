const express = require('express')
const router = express.Router()
const authorController = require('../controllers/auth.controller')
const labelController = require('../controllers/label.controller')

/** PUT api/project/:projectId - update project */
router.route('/:labelId')
  .put(authorController.validate, labelController.updateLabel)

router.param('labelId', labelController.loadLabel)

module.exports = router

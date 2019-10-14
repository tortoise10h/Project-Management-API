const express = require('express')
const router = express.Router()
const authorController = require('../controllers/auth.controller')
const labelController = require('../controllers/label.controller')

router.route('/:labelId')
  /** PUT /api/label/:labelId - update label */
  .put(authorController.validate, labelController.updateLabel)
  /** GET /apilabel/:labelId - get label by id */
  .get(authorController.validate, labelController.getLabel)

router.param('labelId', labelController.loadLabel)

module.exports = router

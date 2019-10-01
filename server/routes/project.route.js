const projectController = require('../controllers/project.controller')
const authorController = require('../controllers/auth.controller')
const labelController = require('../controllers/label.controller')
const columnController = require('../controllers/column.controller')
const express = require('express')
const router = express.Router()

/** POST api/project - add project */
router.route('/')
  .post(authorController.validate, projectController.addProject)

/** PUT api/project/:projectId - update project */
router.route('/:projectId')
  .put(authorController.validate, projectController.updateProject)

router.param('projectId', projectController.loadProject)

/** POST api/project/label - add label */
router.route('/label')
  .post(authorController.validate, labelController.addLabel)

/** POST api/project/column - add column */
router.route('/column')
  .post(authorController.validate, columnController.addColumn)
module.exports = router

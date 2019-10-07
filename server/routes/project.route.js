const projectController = require('../controllers/project.controller')
const authorController = require('../controllers/auth.controller')
const labelController = require('../controllers/label.controller')
const columnController = require('../controllers/column.controller')

const userController = require('../controllers/user.controller')

const express = require('express')
const router = express.Router()

router.route('/')
  /** POST api/project - add project */
  .post(authorController.validate, projectController.addProject)

  /** GET api/project - list all project in system, can filter */
  .get(authorController.validate, projectController.listProject)

router.route('/:projectId')
  /** PUT api/project/:projectId - update project */
  .put(authorController.validate, projectController.updateProject)
router.route('/:projectId/user-project')
  /** POST /api/project/:projectId/user-project - Add user to project */
  .post(authorController.validate, userController.addUserToProject)

  /** GET /api/project/:projectId/user-project - List all user in project, can filter */
  .get(authorController.validate, userController.listUserProject)

router.route('/:projectId/user-project/:userProjectId')
  /** PUT /api/project/:projectId/user-project/:userProjectId - Update user role in project */
  .put(authorController.validate, userController.updateUserRoleInProject)

  /** GET /api/project/:projectId/user-project/:userProjectId - get user project */
  .get(authorController.validate, userController.getUserProject)

router.param('projectId', projectController.loadProject)
router.param('userProjectId', userController.loadUserProject)

/** POST api/project/label - add label */
router.route('/:projectId/label')
  .post(authorController.validate, labelController.addLabel)
/** GET api/project/label - list all label in system, can filter */
  .get(authorController.validate, labelController.listLabel)

/** POST api/project/column - add column */
router.route('/:projectId/column')
  .post(authorController.validate, columnController.addColumn)
/** GET api/project/label - list all label in system, can filter */
  .get(authorController.validate, columnController.listColumn)

module.exports = router

const projectController = require('../controllers/project.controller')
const authorController = require('../controllers/auth.controller')
const labelController = require('../controllers/label.controller')
const columnController = require('../controllers/column.controller')
const logController = require('../controllers/log.controller')

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

  /** GET /api/project/:projectId - get project by id */
  .get(authorController.validate, projectController.getProject)

  /** DELETE /api/project/:projectId - delete project by id */
  .delete(authorController.validate, projectController.deleteProject)

router.route('/:projectId/log')
  /** GET api/project/:projectId/log - get log of project */
  .get(authorController.validate, logController.log.listLog)

router.route('/:projectId/user-not-in-project')
  /** GET /api/project/:projectId/user-not-in-project - get user not in project */
  .get(authorController.validate, userController.listUserNotInProject)

router.route('/:projectId/user-in-project')
  /** GET /api/project/:projectId/user-in-project - get user in project */
  .get(authorController.validate, userController.getUserProject)

  /** PUT /api/project/:projectId/user-in-project - Leave project */
  .put(authorController.validate, projectController.leaveProject)

router.route('/:projectId/user-project')
  /** POST /api/project/:projectId/user-project - Add user to project */
  .post(authorController.validate, userController.addUsersToProject)

  /** POST /api/project/:projectId/user-project - Remove user from project */
  .delete(authorController.validate, userController.removeUserFromProject)

  /** GET /api/project/:projectId/user-project - List all user in project, can filter */
  .get(authorController.validate, userController.listUserProject)

router.route('/:projectId/user-project/:userProjectId')
  /** PUT /api/project/:projectId/user-project/:userProjectId - Update user role in project */
  .put(authorController.validate, userController.updateUserRoleInProject)

router.param('projectId', projectController.loadProject)
router.param('userProjectId', userController.loadUserProject)

router.route('/:projectId/label')
/** POST api/project/label - add label */
  .post(authorController.validate, labelController.addLabel)
/** GET api/project/label - list all label in system, can filter */
  .get(authorController.validate, labelController.listLabel)

router.route('/:projectId/column')
/** POST api/project/column - add column */
  .post(authorController.validate, columnController.column.addColumn)
/** GET api/project/label - list all label in system, can filter */
  .get(authorController.validate, columnController.column.listColumn)

router.route('/:projectId/kanban')
  /** GET api/project/:projectId/kanban */
  .get(authorController.validate, projectController.listKanbanInfo)

module.exports = router

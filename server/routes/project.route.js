const projectController = require('../controllers/project.controller')
const authorController = require('../controllers/auth.controller')
const express = require('express')
const router = express.Router()

/** POST api/project - add project */
router.route('/')
  .post(authorController.validate, projectController.addProject)
module.exports = router

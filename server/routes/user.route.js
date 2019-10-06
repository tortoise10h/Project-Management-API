const express = require('express')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const upload = require('../lib/upload')
const router = express.Router()

router.route('/')
  /** GET /api/user - List all user in system, can filter */
  .get(authController.validate, userController.listUser)

router.route('/:userId')
  /** GET /api/user/:userid - Get user by id */
  .get(authController.validate, userController.getUser)

  /** PUT /api/user/:userid - Update user information */
  .put(authController.validate, upload.userAvatar, userController.updateUser)

router.param('userId', userController.loadUser)

module.exports = router

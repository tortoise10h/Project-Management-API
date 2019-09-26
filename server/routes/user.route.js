const express = require('express')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const router = express.Router()

/** GET /api/user/:userd - Get user by id */
router.route('/:userId')
  .get(authController.validate, userController.getUser)

/** GET /api/user/me - Get user own user info */
router.route('/me')
  .get(authController.validate, userController.getMe)

router.param('userId', userController.loadUser)

module.exports = router

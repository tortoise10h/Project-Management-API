const express = require('express')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const router = express.Router()

/** POST /api/user - Create new user */
router.route('/')
  .post(userController.addUser)

module.exports = router

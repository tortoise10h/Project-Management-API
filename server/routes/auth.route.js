const express = require('express')
const authController = require('../controllers/auth.controller')

const router = express.Router()

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(authController.login)

/** POST /api/auth/refresh - Return new token refreshed expire time */
router.route('/refresh')
  .post(authController.refresh)

/** POST /api/auth/register - Return email to verify */
router.route('/signup')
  .post(authController.signup)

/** POST /api/auth/confirm - Confirm email to change user to logined */
router.route('/confirm')
  .post(authController.confirm)

/** POST /api/auth/forgot-password - send email to forgot password */
router.route('/forgot-password')
  .post(authController.forgotPassword)

/** POST /api/auth/change-password - send email to forgot password */
router.route('/change-password')
  .post(authController.changePassword)

module.exports = router

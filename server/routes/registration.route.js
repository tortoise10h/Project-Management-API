const express = require('express');
const authController = require('../controllers/auth.controller');
const registrationController = require('../controllers/registration.controller');
const studentController = require('../controllers/student.controller');
const { USER_ROLE } = require('../../common').constant;

const { permit } = authController;

const router = express.Router();

/** Registration routes */
router.route('/')
/** Get /api/registration - Get list registrations with pagination */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), registrationController.listRegistration)

/** Post /api/registration - Create new registration */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), registrationController.addRegistration);

router.route('/searchv2').get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), registrationController.searchRegistration);

/** GET /api/registration/student - Get student list by registration list */
router.post('/student', authController.validate, registrationController.listStudentInRegistrations);

router.route('/:registrationId')
/** GET /api/registration/:registrationId - Get registration */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), registrationController.getRegistration)

/** PUT /api/registration/:registrationId - Update registration */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), registrationController.updateRegistration)

/** DELETE /api/registration/:registrationId - Delete registration */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), registrationController.deleteRegistration);

router.route('/:registrationId/student')
/** GET /api/registration/:registrationId/student - Get students of registration */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), studentController.listStudent)

/** POST /api/registration/:registrationId/student - Add students to registration */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), registrationController.addStudent)

/** DELETE /api/registration/:registrationId/student - Delete students to registration */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), registrationController.deleteStudent);

/** Load category when API with registrationId route parameter is hit */
router.param('registrationId', registrationController.loadRegistration);

module.exports = router;

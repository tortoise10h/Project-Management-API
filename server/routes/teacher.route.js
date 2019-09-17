const express = require('express');
const authController = require('../controllers/auth.controller');
const teacherController = require('../controllers/teacher.controller');

const router = express.Router();

const { USER_ROLE } = require('../../common').constant;

const { permit } = authController;

/** Teacher routes */
router.route('/')
/** GET /api/teacher - Get list of teacher */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), teacherController.listTeacher)

/** POST /api/teacher -Create new teacher */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), teacherController.addTeacher);

/** GET /api/teacher/search - Search teacher */
router.route('/searchv2').get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), teacherController.searchTeacher);

router.route('/:teacherId')
/** GET /api/teacher/:teacherId - Get teacher */
  .get(authController.validate, teacherController.getTeacher)

/** PUT /api/teacher/:teacherId - Update teacher */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.TEACHER), teacherController.updateTeacher)

/** DELETE /api/teacher/:teacherId - Delete teacher */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), teacherController.deleteTeacher);

/** Load teacher when API with teacherId route parameter is hit */
router.param('teacherId', teacherController.loadTeacher);

module.exports = router;

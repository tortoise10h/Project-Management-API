const express = require('express');
const authController = require('../controllers/auth.controller');
const studentController = require('../controllers/student.controller');

const { upload } = require('../lib');

const router = express.Router();


const { USER_ROLE } = require('../../common').constant;

const { permit } = authController;

/** Student routes */
router.route('/')
/** GET /api/student - Get list of student */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), studentController.listStudent);

/** GET /api/student - Search student */
router.get('/search', permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), studentController.searchStudentV1); // Replace original search route after FE done change to v2
router.route('/searchv2').get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), studentController.searchStudent);

router.route('/:studentId/class')
/** GET /api/student/:studentId/class - Get list classes by student id */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER, USER_ROLE.STUDENT), studentController.getListClassByStudentID);

router.route('/:studentId/class/:classId')
/** GET /api/student/:studentId/class/:classId - Get class by student id */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER, USER_ROLE.STUDENT), studentController.geClassByStudentID);

router.route('/:studentId')
/** GET /api/student/:studentId - Get student */
  .get(authController.validate, studentController.getStudent)

/** PUT /api/student/:studentId - Update student */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER, USER_ROLE.STUDENT), studentController.updateStudent)

/** DELETE /api/student/:studentId - Delete student */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER, USER_ROLE.STUDENT), studentController.deleteStudent);

router.route('/:studentId/photo')
/** PUT /api/student/:studentId/photo - Update student photo */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER, USER_ROLE.STUDENT), upload.studentPhoto, studentController.updateStudentPhoto);

/** Load student when API with studentId route parameter is hit */
router.param('studentId', studentController.loadStudent);


module.exports = router;

const express = require('express');
const authController = require('../controllers/auth.controller');
const classController = require('../controllers/class.controller');
const registrationController = require('../controllers/registration.controller');
const scheduleController = require('../controllers/schedule.controller');
const timeableController = require('../controllers/timetable.controller');
const enquiryController = require('../controllers/enquiry.controller');

const { constant: { USER_ROLE } } = require('../../common');

const { permit } = authController;

// const certificateController = require('../controllers/certificate.controller');

const router = express.Router();

/** Class routes */
router.route('/')
/** Get /api/class - Get list of class */
  .get(authController.validate, classController.listClass)

/** Post /api/class - Create new class */
  .post(permit(USER_ROLE.MANAGER, USER_ROLE.ADMIN), classController.addClass);

/** Class routes */
router.route('/publish')
/** Get /api/class - Get list of class */
  .get(classController.listClassPublish);

router.route('/searchv2').get(permit(USER_ROLE.MANAGER, USER_ROLE.ADMIN), classController.searchClass);

router.route('/:classId')
/** GET /api/class/:classId - Get class */
  .get(authController.validate, classController.getClass)

/** PUT /api/class/:classId - Update class */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), classController.updateClass)

/** DELETE /api/class/:classId - Delete class */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), classController.deleteClass);

router.route('/:classId/student')
/** GET /api/class/:classId/student - Get all students in class */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.TEACHER), classController.listStudentInClass)
/** PUT /api/class/:classId/student - Update all students in class */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.TEACHER), classController.updateAllStudentsInClass);

router.route('/:classId/registration')
/** GET /api/class/:classId/registration - Get all registration of class */
  .get(permit(USER_ROLE.MANAGER, USER_ROLE.ADMIN), registrationController.listRegistration);

router.route('/:classId/status')
/** GET /api/class/:classId/status - Update class status */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), classController.updateClassStatus);

router.route('/:classId/teacher/assign')
/** GET /api/class/:classId/teacher/assign - Get teachers of class */
  .get(authController.validate, classController.getTeacherOfClass)
/** POST /api/class/:classId/teacher/assign - Assign teacher to class */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), classController.assignTeacher);

router.route('/:classId/schedule')
/** POST /api/class/:classId/schedule - Add new schedules to class */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), scheduleController.addListSchedule)

/** GET /api/class/:classId/schedule - List all schedule of class */
  .get(authController.validate, scheduleController.listSchedule);

router.route('/:classId/schedule/:scheduleId')
/** PUT /api/class/:classId/schedule/:scheduleId - Update schedule of class */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), scheduleController.updateSchedule)

/** DELETE /api/class/:classId/schedule/:scheduleId - Delete schedule of class */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), scheduleController.deleteSchedule);

router.route('/:classId/timetable')
/** GET /api/class/:classId/timeable - List all timeable of class */
  .get(authController.validate, timeableController.timetable.listTimeable);

router.route('/:classId/publish')
/** GET /api/class/:classId/publish - Update class publish status */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), classController.toggleClassPublish);

router.route('/:classId/enquiry')
/** GET /api/class/:classId/enquiry - Get list enquiry of class */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), enquiryController.listEnquiry)

/** PUT /api/class/:classId/enquiry - update list enquiry status of class */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), enquiryController.updateListEnquiryStatus);

router.route('/:classId/timetable/months')
/** GET /api/class/:classId/timeable/months - List all months of timetale of class */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), timeableController.timetable.getListMonthsOfClass);

router.route('/schedule/week')
/** GET /api/class/schedule/week - List schedule all class in week */
  .get(authController.validate, classController.scheduleOfAllClassInWeek);
router.route('/schedule/months')
/** GET /api/class/schedule/month - List week of year all class in week */
  .get(authController.validate, classController.allWeekScheduleByYearInAllClass);

/** Load category when API with classId route parameter is hit */
router.param('classId', classController.loadClass);
router.param('scheduleId', scheduleController.loadSchedule);

module.exports = router;

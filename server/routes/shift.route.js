const express = require('express');
const authController = require('../controllers/auth.controller');
const shiftController = require('../controllers/shift.controller');

const { USER_ROLE } = require('../../common').constant;

const { permit } = authController;


const router = express.Router();

/** Center routes */
router.route('/')
/** GET /api/shift - List all study shift */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), shiftController.listStudyShift)

/** POST /api/shift - Add new study shift */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), shiftController.addStudyShift);

router.route('/:studyShiftId')
/** PUT /api/shift/:studyShiftId - Update study shift */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), shiftController.updateStudyShift)

/** GET /api/shift/:studyShiftId - Get study shift by id */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), shiftController.getStudyShift)

/** DELETE /api/shift/:studyShiftId - Delete study shift by id */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), shiftController.deleteStudyShift);


router.param('studyShiftId', shiftController.loadStudyShift);

module.exports = router;

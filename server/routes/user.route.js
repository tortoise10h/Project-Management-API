const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();
const { USER_ROLE } = require('../../common').constant;

const { permit } = authController;

/** Role routes */
// router.route('/role/')
//     /** Get /api/user/role - Get list of role */
//     .get(permit(USER_ROLE.ADMIN), userController.listRole)

//     /** Post /api/user/role - Create new role */
//     .post(permit(USER_ROLE.ADMIN), userController.addRole);

router.route('/role/searchv2').get(permit(USER_ROLE.ADMIN), userController.searchRole);

router.route('/role/:roleId')
/** GET /api/user/role/:roleId - Get role */
  .get(permit(USER_ROLE.ADMIN), userController.getRole)

/** PUT /api/user/role/:roleId - Update role */
  .put(permit(USER_ROLE.ADMIN), userController.updateRole)

/** DELETE /api/user/role/:roleId - Delete role */
  .delete(permit(USER_ROLE.ADMIN), userController.deleteRole);

/** Load role when API with roleId route parameter is hit */
router.param('roleId', userController.loadRole);

/** UserType routes */
router.route('/userType/')
/** Get /api/user/userType - Get list of userType */
  .get(permit(USER_ROLE.ADMIN), userController.listUserType)

/** Post /api/user/userType - Create new userType */
  .post(permit(USER_ROLE.ADMIN), userController.addUserType);

router.route('/userType/searchv2').get(permit(USER_ROLE.ADMIN), userController.searchUserType);

router.route('/userType/:userTypeId')
/** GET /api/user/userType/:userTypeId - Get userType */
  .get(permit(USER_ROLE.ADMIN), userController.getUserType)

/** PUT /api/user/userType/:userTypeId - Update userType */
  .put(permit(USER_ROLE.ADMIN), userController.updateUserType)

/** DELETE /api/user/userType/:userTypeId - Delete userType */
  .delete(permit(USER_ROLE.ADMIN), userController.deleteUserType);

/** Load userType when API with userTypeId route parameter is hit */
router.param('userTypeId', userController.loadUserType);

/** User routes */
router.route('/')
/** GET /api/user - Get list of user */
  .get(permit(USER_ROLE.ADMIN), userController.listUser)

/** POST /api/user - Create new user */
  .post(permit(USER_ROLE.ADMIN), userController.addUser);

router.route('/me')
/** GET /api/user - Get me */
  .get(authController.validate, userController.getMe);


router.route('/searchv2').get(permit(USER_ROLE.ADMIN), userController.searchUser);

router.route('/:userId')
/** GET /api/user/:userId - Get user */
  .get(authController.validate, userController.getUser)

/** PUT /api/user/:userId - Update user */
  .put(authController.validate, userController.updateUser);

/** DELETE /api/user/:userId - Delete user */
// .delete(authController.validate, userController.deleteUser);

/** Load user when API with userId route parameter is hit */
router.param('userId', userController.loadUser);

module.exports = router;

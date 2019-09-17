const express = require('express');
const authController = require('../controllers/auth.controller');
const enquiryController = require('../controllers/enquiry.controller');
const { USER_ROLE } = require('../../common').constant;

const { permit } = authController;

const router = express.Router();

/** Enquiry routes */
router.route('/')
/** Get /api/enquiry - Get list enquiries with pagination */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), enquiryController.listEnquiry);

router.route('/:enquiryId')
/** GET /api/enquiry/:registrationId - Get enquiry */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), enquiryController.getEnquiry)

/** PUT /api/enquiry/:enquiryId - Update enquiry */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), enquiryController.updateEnquiryStatus)

/** DELETE /api/enquiry/:enquiryId - Delete enquiry */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), enquiryController.deleteEnquiry);

/** Load enquiry when API with enquiryId route parameter is hit */
router.param('enquiryId', enquiryController.loadEnquiry);

module.exports = router;

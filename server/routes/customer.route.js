const express = require('express');
const authController = require('../controllers/auth.controller');
const customerController = require('../controllers/customer.controller');
const studentController = require('../controllers/student.controller');
const registrationController = require('../controllers/registration.controller');
const classController = require('../controllers/class.controller');
const enquiryController = require('../controllers/enquiry.controller');

const { upload } = require('../lib');

const router = express.Router();

const { constant: { USER_ROLE } } = require('../../common');

const { permit } = authController;

/** Customer routes */
router.route('/')
/** GET /api/customer - Get list of customer */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), customerController.listCustomer)

/** POST /api/customer - Create new customer */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), customerController.addCustomer);

/** GET /api/customer/search - Search customer */
router.route('/search')
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), customerController.searchCustomerV1); // Replace original search route after FE done change to v2
// router.route('/searchv2').get(authController.validate, customerController.searchCustomer);

router.route('/:customerId')
/** GET /api/customer/:customerId - Get customer */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), customerController.getCustomer)

/** PUT /api/customer/:customerId - Update customer */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), customerController.updateCustomer)

/** DELETE /api/customer/:customerId - Delete customer */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), customerController.deleteCustomer);

/** Load customer when API with customerId route parameter is hit */
router.param('customerId', customerController.loadCustomer);

router.route('/:customerId/photo')
/** PUT /api/customer/:customerId/photo - Update customerId photo */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), upload.customerPhoto, customerController.updateCustomerPhoto);

router.route('/:customerId/student')
/** GET api/customer/:customerId/student - Get student list of customer */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), studentController.listStudent)

/** POST api/customer/:customerId/student - Add new student to customer */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), upload.studentPhoto, studentController.addStudent);

router.route('/:customerId/registration')
/** GET api/customer/:customerId/registration - Get registration list of customer */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), registrationController.listRegistrationOfCustomer);

/** /api/customer/:customerId/student/import - Upload list students */
router.route('/:customerId/student/upload')
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), studentController.uploadStudent);

router.route('/:customerId/student/viewUpload')
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), upload.excelFile, customerController.viewUpload);

router.route('/:customerId/class')
/** GET api/customer/:customerId/class - List class of customer */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), classController.listClass);

router.route('/:customerId/notInRegistration')
/** GET api/customer/:customerId/class - List class of customer */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), studentController.listStudentOfCustomerNotInRegistration);

router.route('/:customerId/enquiry')
/** GET /api/customer/:customerId/enquiry - Get list enquiry of customer */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), enquiryController.listEnquiry)
/** POST /api/customer/:customerId/enquiry - Create new enquiry by customer id */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), enquiryController.addEnquiry);

module.exports = router;

const express = require('express');
const authController = require('../controllers/auth.controller');
const certificateController = require('../controllers/certificate.controller');
const upload = require('../lib/upload');

const { permit } = authController;
const { USER_ROLE } = require('../../common').constant;

const router = express.Router();

router.route('/type/searchv2').get(authController.validate, certificateController.certifcate.searchCertificateType);

router.route('/type')
/** GET /api/certificate/type - List all certificate type */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.listCertificateType);

router.route('/type/:certificateTypeId')
/** GET /api/certificate/type/:certificateTypeId - Get certificate type */
  .get(authController.validate, certificateController.certifcate.getCertificateType)

/** PUT /api/certificate/type/:certificateTypeId - Update certificate type */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.updateCertificateType);

router.route('/type/:certificateTypeId/photo')
/** PUT /api/certificate/type/:certificateTypeId/photo - Update certificate type photo */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.updateCertificateTypePhoto);

/** Load certificate type when API with certificateId route parameter is hit */
router.param('certificateTypeId', certificateController.certifcate.loadCertificateType);

/** CERTIFICATE FORMAT ROUTES */
router.route('/format')
/** GET /api/certificate/format - List all certificate format */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.listCertificateFormat)

/** POST /api/certificate/format - Add new certificate format */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), upload.certificateFormatPhoto, certificateController.certifcate.addCertificateFormat);

router.route('/format/:certificateFormatId')
/** GET /api/certificate/format/:certificateFormatId - Get certificate format */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.getCertificateFormat)

/** PUT /api/certificate/format/:certificateTypeId - Update certificate format */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.updateCertificateFormat)

/** DELETE /api/certificate/format/:certificateTypeId - Delete certificate format */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.deleteCertificateFormat);

router.route('/format/:certificateFormatId/photo')
/** PUT /api/certificate/format/:certificateFormatId/photo - update certificate format photo */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), upload.certificateFormatPhoto, certificateController.certifcate.updateCertificateFormatPhoto);

router.param('certificateFormatId', certificateController.certifcate.loadCertificateFormat);
/** ISSUE CERTIFICATE ROUTES */
router.route('/')
/** Get /api/certificate - Get list of issue certificate */
  .get(authController.validate, certificateController.certifcate.listCertificate)

/** POST /api/certificate - Issue New Certificate */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.issueCertificate);

router.route('/searchv2').get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.searchCertificate);

router.route('/:certificateId')
/** GET /api/certificate/:issueCertificateId - Get Issue certificate */
  .get(authController.validate, certificateController.certifcate.getCertificate)

/** PUT /api/certificate/:issueCertficateId - Update Issue certificate */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.updateCertificate);

/** Load certificate when API with issueCertificateId route parameter is hit */
router.param('certificateId', certificateController.certifcate.loadCertificate);


module.exports = router;

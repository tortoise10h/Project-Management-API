const express = require('express');
const authController = require('../controllers/auth.controller');
const categoryController = require('../controllers/category.controller');
const courseController = require('../controllers/course.controller');
const certificateController = require('../controllers/certificate.controller');
const docmentController = require('../controllers/document.controller');
const { upload } = require('../lib');
const { USER_ROLE } = require('../../common').constant;

const { permit } = authController;

const router = express.Router();

/** Category routes */
router.route('/category/')
/** Get /api/course/category - Get list of category */
  .get(categoryController.listCategory)

/** Post /api/course/category - Create new category */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), upload.categoryImage, categoryController.addCategory);

router.route('/category/top')
  .get(categoryController.getTopCategory);

router.route('/category/searchv2').get(authController.validate, categoryController.searchCategory);

router.route('/category/:categoryId')
/** GET /api/course/category/:categoryId - Get category */
  .get(categoryController.getCategory)

/** PUT /api/course/category/:categoryId - Update category */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), upload.categoryImage, categoryController.updateCategory)

/** DELETE /api/course/category/:categoryId - Delete category */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), categoryController.deleteCategory);

/** Load category when API with categoryId route parameter is hit */
router.param('categoryId', categoryController.loadCategory);

/** Course route */
router.route('/')
/** Get /api/course - Get list of course */
  .get(courseController.listCourse)

/** POST api/course - Add new course */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), upload.coursePhoto, courseController.addCourse);

/** GET /api/course/search - Search course */
router.route('/search').get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), courseController.searchCourseV1); // Replace original search route after FE done change to v2
router.route('/searchv2').get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), courseController.searchCourse);

router.route('/:courseId')
/** Put /api/course/:courseId - get course */
  .get(courseController.getCourse)

/** Put /api/course/:courseId - update course */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), upload.coursePhoto, courseController.updateCourse)

/** Delete /api/course/:courseId - delete course */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), courseController.deleteCourse);

router.route('/:courseId/photo')
/** Put /api/course/:courseId - update course */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), upload.coursePhoto, courseController.updateCoursePhoto);

/** Load category when API with classId route parameter is hit */
router.param('courseId', courseController.loadCourse);

router.route('/:courseId/registration')
/** Get /api/course/:courseId/registration - get list registrations of course */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CUSTOMER), courseController.getListRegistrationOfCourse);

router.route('/:courseId/class')
/** Get /api/course/:courseId/registration - get list class of course */
  .get(authController.validate, courseController.getListClassOfCourse);

router.route('/:courseId/curriculum')
/** Get /api/course/:courseId/curriculum - get curriculumn of course */
  .get(courseController.getCurriculumOfCourse)

/** Post /api/course/:courseId/curriculum - add curriculumn of course */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), courseController.addCurriculumToCourse);

router.route('/:courseId/curriculum/:courseUnitId')
/** Put /api/course/:courseId/curriculum/:courseUnitId - Update course unit of curriculumn of course */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), courseController.updateCourseUnit)

/** Delete /api/course/:courseId/curriculum/:courseUnitId - Delete course unit of curriculumn of course */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), courseController.deleteCourseUnit);

router.route('/:courseId/curriculum/available-index')
/** Get /api/course/:courseId/curriculum//available-index - get all available index can use */
  .get(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), courseController.listAvailableSessionIndex);

router.param('courseUnitId', courseController.loadCourseUnit);

router.route('/:courseId/certificateType')
/** Get /api/course/:courseId/certificateType - List certificate type of course */
  .get(authController.validate, certificateController.certifcate.listCertificateType)

/** Post /api/course/:courseId/certificateType - Add new certificate type of course */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), certificateController.certifcate.addCertificateType);

router.route('/:courseId/document')
/** Post /api/course/:courseId/document - Add new document of course */
  .post(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), upload.courseDocument, docmentController.addDocument)

/* GET /api/course/:course/document - Get list of doucment */
  .get(authController.validate, docmentController.listDocument);

router.route('/:courseId/document/:documentId')
/* GET /api/course/:courseId/document/:documentId - Get document of course */
  .get(authController.validate, docmentController.getDocumentOfCourse)

/* PUT /api/course/:courseId/document/:documentId - Update document of course */
  .put(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), upload.courseDocument, docmentController.updateDocument)

/* DELETE /api/course/:course/document/:documentId - Delete document */
  .delete(permit(USER_ROLE.ADMIN, USER_ROLE.MANAGER), docmentController.deleteDocument);
router.param('documentId', docmentController.loadDocument);

module.exports = router;

// #region [Certificate] Issue certificate for student in class
/**
 * @api {post} /api/certificate [Certificate] Issue certificate for students of class
 * @apiDescription Issue certificate for students in class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} class_id (required) Class id
 * @apiParam {Number} certificate_type_id (required) Certificate type id
 * @apiParam {Date} effected_date (required) effected date of issued certificate
 * @apiParam {Array} list_student_id (optional) Array (String) of student's id in class that need to issue, if null issue for all student in class
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/certificate
 *  {
 *      "class_id": "CLS-JAVA_BASIC-00001"
 *      "certificate_type_id": 1,
 *      "effected_date": "2019-07-25",
 *      "list_student_id": ["S-00000001", "S-00000002", "S-00000003"]
 *  }
 *
 * @apiSuccess (Success) {Object} result successList (array of issue certificates were created) and errorList
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "successList":[
 *       {
 *           "is_active":true,
 *           "is_deleted":false,
 *           "id":1,
 *           "class_student_id":3,
 *           "certificate_type_id":1,
 *           "effected_date":"2019-07-25",
 *           "added_by":1,
 *           "updatedAt":"2019-07-20T17:04:03.901Z",
 *           "createdAt":"2019-07-20T17:04:03.893Z",
 *           "code":"1.JAVA.S-00000003"
 *       }
 *   ],
 *   "errorList":[
 *       {
 *           "student_id":"S-00000001",
 *           "error":"Rank invalid, student S-00000001 is failed"
 *       },
 *       {
 *           "student_id":"S-00000002",
 *           "error":"Rank invalid, student S-00000002 is failed"
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Certificate] List certificate of class or sutdent
/**
 * @api {get} /api/certificate [Certificate] List certificate of class or sutdent
 * @apiDescription List all issue certificate in system (can filter if need)
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} student_id (optional) Id of student, use when get list certificate of student
 * @apiParam {String} class_id (optional) class id, use when get list certificate of class
 * @apiParam {Number} certificate_type_id (optional) certificate type id, use when get list certificate of type
 * @apiParam {String} code (optional) code of certificate, use when get list certificate same prefix
 * @apiParam {Date} effected_date (optional) effected date of issue certificate
 * @apiParam {String} sort (optional) Sort by field. Default: code
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/certificate
 *  http://localhost:3000/api/certificate?class_id=CLS-JAVA_BASIC-00002
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "totalRecord":3,
 *   "totalPage":3,
 *   "page":1,
 *   "data":[
 *       {
 *           "id":1,
 *           "code":"1.MANAGING_SAFELY.S-00000002",
 *           "class_student_id":8,
 *           "certificate_type_id":8,
 *           "effected_date":"2019-08-21",
 *           "added_by":1,
 *           "is_active":true,
 *           "ClassStudent":{
 *               "id":8,
 *               "theory_marks":6,
 *               "practice_marks":7,
 *               "final_result_level":"Good",
 *               "class_id":"CLS-RUBY_BASIC-00001",
 *               "student_id":"S-00000002",
 *               "issued":true,
 *               "is_active":true,
 *               "Class":{
 *                   "id":"CLS-RUBY_BASIC-00001",
 *                   "name":"Ruby with Huy",
 *                   "status":"Completed",
 *                   "session_studied": 0,
 *                   "total_students":4,
 *                   "total_teachers":2,
 *                   "capacity":50,
 *                   "start_date":"2019-08-09",
 *                   "end_date":"2019-09-13",
 *                   "course_id":8,
 *                   "center_id":1,
 *                   "teacher_assigned":true,
 *                   "certification_organization":null,
 *                   "added_by":1,
 *                   "is_active":true
 *               },
 *               "Student":{
 *                   "id":"S-00000002",
 *                   "first_name":"Văn Thanh",
 *                   "last_name":"Nguyễn",
 *                   "gender":"female",
 *                   "date_of_birth":1993,
 *                   "identifier":"2315627893454",
 *                   "address":"201 Trần Não, Quận 2",
 *                   "city":"TPHCM",
 *                   "country":"Việt Nam",
 *                   "zip":"70000",
 *                   "photo_location":null,
 *                   "phone":"0918447837",
 *                   "email":"vanthanh@digitechglobalco.com",
 *                   "position":"Manager",
 *                   "nationality":"Japanese",
 *                   "is_active":true
 *               }
 *           },
 *           "CertificateType":{
 *               "id":8,
 *               "code":"MANAGING_SAFELY",
 *               "expire_time":11,
 *               "duration_in":"month",
 *               "course_id":8,
 *               "description":null,
 *               "certificate_format_id":4,
 *               "is_active":true
 *           }
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Certificate] Get detail of a certificate issued by Id
/**
 * @api {get} /api/certificate/:certificateId [Certificate] Get detail of certificate
 * @apiDescription Get issue certificate infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} certificateId (required) certificateId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/certificate/1
 *
 * @apiSuccess (Success) {Object} Issue certificate object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "id": 2,
 *    "code": "2.JAVA.S-00000002",
 *    "class_student_id": 2,
 *    "certificate_type_id": 1,
 *    "effected_date": "2019-08-05",
 *    "added_by": 1,
 *    "is_active": true,
 *    "is_deleted": false,
 *    "inactivedAt": null,
 *    "deletedAt": null,
 *    "createdAt": "2019-08-04T11:08:37.000Z",
 *    "updatedAt": "2019-08-04T11:08:37.000Z",
 *    "CertifcateType": {
 *        "id": 1,
 *        "code": "JAVA",
 *        "expire_time": 4,
 *        "duration_in": "year",
 *        "course_id": 1,
 *        "description": null,
 *        "certificate_format_id": 1,
 *        "added_by": 1,
 *        "is_active": true,
 *        "is_deleted": false,
 *        "inactivedAt": null,
 *        "deletedAt": null,
 *        "createdAt": "2019-08-04T06:37:03.000Z",
 *        "updatedAt": "2019-08-04T06:37:03.000Z",
 *        "CertificateFormat": {
 *            "id": 1,
 *            "name": "Managing safely",
 *            "format": "managing_certification",
 *            "front_photo_location": "uploads/mim_development/certificate-format/photo/HLATVSL- Mat_Ngoai.jpg",
 *            "back_photo_location": "uploads/mim_development/certificate-format/photo/HLATVSL- Mat_Trong.jpg",
 *            "added_by": 1,
 *            "is_active": true,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-08-04T06:36:58.000Z",
 *            "updatedAt": "2019-08-04T06:36:58.000Z"
 *        }
 *    }
 * }
 */
// #endregion

// #region [Certificate] List certificate type
/**
 * @api {get} /api/certificate/type [CertificateType] List certificate type
 * @apiDescription List all certificatee type in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} code (optional) Code of certificate type
 * @apiParam {Number} expire_time (optional) Expire time of certificate type
 * @apiParam {String} duration_in (optional) Expire time unit of certificate type
 * @apiParam {String} description (optional) Description of certificate type
 * @apiParam {Boolean} is_active (optional) Active status of certificate type
 * @apiParam {String} sort (optional) Sort by field. Default: code
 * @apiParam {Number} certificate_format_id (optional) Certificate format id of certificate type
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/certificate/type
 *  http://localhost:3000/api/certificate/type?code=ATVSTP
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "totalRecord":1,
 *   "totalPage":1,
 *   "page":1,
 *   "data":[
 *       {
 *           "id":4,
 *           "code":"ATVSTP",
 *           "expire_time":7,
 *           "duration_in":"month",
 *           "course_id":4,
 *           "description":null,
 *           "certificate_format_id":4,
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-08-26T08:10:11.000Z",
 *           "updatedAt":"2019-08-26T08:10:11.000Z",
 *           "Course":{
 *               "id":4,
 *               "code":"COURSE_03",
 *               "name":"Khóa học Công Nghệ Thông Tin",
 *               "excerpt":null,
 *               "detail":"Công Nghệ Thông Tin chất lượng giá tốt giành cho mọi người, Chúng tôi đem đến cho bạn khóa học Công Nghệ Thông Tin đầy đủ kiến thức giúp bạn phát triển được tiềm năng bản thân. Chúc bạn học tập thật tốt",
 *               "total_sessions":20,
 *               "session_duration":2,
 *               "session_duration_in":"hour",
 *               "fee_currency":"$",
 *               "institute_id":1,
 *               "course_category_id":4,
 *               "avatar_location":null,
 *               "trailer_location":null,
 *               "price":200,
 *               "type_cost":0,
 *               "releasedAt":null
 *           },
 *           "CertificateFormat":{
 *               "id":4,
 *               "name":"Atld certification",
 *               "format":"atld_certification",
 *               "front_photo_location":"uploads/mim_development/certificate-format/photo/The_ATLD_Mat_Truoc.jpg",
 *               "back_photo_location":"uploads/mim_development/certificate-format/photo/The_ATLD_Mat_Sau.jpg"
 *           }
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Certificate] Update certificate type
/**
 * @api {put} /api/certificate/type/:certificateTypeId [CertificateType] Update certificate type
 * @apiDescription Update certificate type information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} certificateTypeId (required) certificateTypeId passed as param
 *
 * @apiParam {String} code (optional) certificate type code
 * @apiParam {Number} expire_time (optional) certificate type expire time
 * @apiParam {String} duration_in (optional) expire time unit
 * @apiParam {String} description (optional) certificate type description
 * @apiParam {String} certificate_format_id (optional) certificate format id of certificate type
 * @apiParam {Boolean} is_active (optional) certificate type active status
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/certificate/type/5
 *  {
 *   "code": "HUYPYTHON",
 *   "expire_time": "5",
 *   "duration_in": "year",
 *   "description": "Huy python description",
 *   "certificate_format_id": 3
 *  }
 *
 * @apiSuccess (Success) {Object} Course object updated details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id":5,
 *   "code":"HUYPYTHON",
 *   "expire_time":5,
 *   "duration_in":"year",
 *   "course_id":5,
 *   "description":"Huy python description",
 *   "certificate_format_id":3,
 *   "added_by":1,
 *   "is_active":true,
 *   "is_deleted":false,
 *   "inactivedAt":null,
 *   "deletedAt":null,
 *   "createdAt":"2019-08-01T17:39:29.000Z",
 *   "updatedAt":"2019-08-01T17:45:42.683Z"
 * }
 */
// #endregion

// #region [Certificate] Get certificate type
/**
 * @api {get} /api/certificate/type/:certificateTypeId [CertificateType] Get certificate type
 * @apiDescription Get certificate type information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} certificateTypeId (required) certificateTypeId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/certificate/type/1
 *
 * @apiSuccess (Success) {Object} Course object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id":1,
 *   "code":"JAVA",
 *   "expire_time":4,
 *   "duration_in":"year",
 *   "course_id":1,
 *   "description":null,
 *   "certificate_format_id":1,
 *   "added_by":1,
 *   "is_active":true,
 *   "is_deleted":false,
 *   "inactivedAt":null,
 *   "deletedAt":null,
 *   "createdAt":"2019-08-01T17:39:28.000Z",
 *   "updatedAt":"2019-08-01T17:39:28.000Z"
 * }
 */
// #endregion

// #region [Certificate] List certificate format
/**
 * @api {get} /api/certificate/format [Certificate] List certificate format
 * @apiDescription List all certificate format in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} name (optional) Id of student, use when get list certificate of student
 * @apiParam {String} format (optional) class id, use when get list certificate of class
 * @apiParam {String} sort (optional) Sort by field. Default: createdAt
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/certificate/format
 *  http://localhost:3001/api/certificate/format?name=hlatv
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "totalRecord":1,
 *   "totalPage":1,
 *   "page":1,
 *   "data":[
 *       {
 *           "id":3,
 *           "name":"Hlatvsl certification",
 *           "format":"hlatvsl_safely",
 *           "front_photo_location":"uploads/mim_development/certificate-format/photo/HLATVSL- Mat_Ngoai.jpg",
 *           "back_photo_location":"uploads/mim_development/certificate-format/photo/HLATVSL- Mat_Trong.jpg",
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-08-08T09:51:03.000Z",
 *           "updatedAt":"2019-08-08T09:51:03.000Z"
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Certificate] Get certificate format
/**
 * @api {get} /api/certificate/format/:certificateFormatId [CertificateType] Get certificate format
 * @apiDescription Get certificate format information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} certificateFormatId (required) certificateFormatId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/certificate/format/1
 *
 * @apiSuccess (Success) {Object} Course object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id":1,
 *   "name":"Managing safely",
 *   "format":"managing_certification",
 *   "front_photo_location":"uploads/mim_development/certificate-format/photo/HLATVSL- Mat_Ngoai.jpg",
 *   "back_photo_location":"uploads/mim_development/certificate-format/photo/HLATVSL- Mat_Trong.jpg",
 *   "added_by":1,
 *   "is_active":true,
 *   "is_deleted":false,
 *   "inactivedAt":null,
 *   "deletedAt":null,
 *   "createdAt":"2019-08-08T09:51:03.000Z",
 *   "updatedAt":"2019-08-08T09:51:03.000Z"
 * }
 */
// #endregion

// #region [Certificate] Add new certificate format
/**
 * @api {post} /api/certificate/format [Certificate] Add new certificate format
 * @apiDescription Add certificate format infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (required) courseId passed as param
 *
 * @apiParam {File} front_photo (optional) image for front photo of certificate format
 * @apiParam {File} back_photo (optional) image for back photo of certificate format
 *
 * @apiParam {String} name (required) name of certificate format
 * @apiParam {String} format (required) format of certificate format
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/certificate/type
 * {
 *   "name": "New certificate format",
 *   "format": "huy_format",
 * }
 *
 * @apiSuccess (Success) {Object} created certificate format info
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "is_active":true,
 *   "is_deleted":false,
 *   "id":14,
 *   "name":"New certificate format",
 *   "format":"huy_format",
 *   "added_by":1,
 *   "updatedAt":"2019-08-09T04:17:25.584Z",
 *   "createdAt":"2019-08-09T04:17:25.584Z"
 * }
 */
// #endregion

// #region [Certificate] Update certificate format
/**
 * @api {put} /api/certificate/format/:certificateFormatId [Certificate] Update certificate format
 * @apiDescription Update certificate format information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} certificateTypeId (required) certificateTypeId passed as param
 *
 * @apiParam {String} name (optional) name of certificate format
 * @apiParam {String} format (optional) format of certificate format
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/certificate/format/14
 *  {
 *       "name": "New name of format",
 *       "format": "new_fix_format"
 *  }
 *
 * @apiSuccess (Success) {Object} certificate format updated details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id":14,
 *   "name":"New name of format",
 *   "format":"new_fix_format",
 *   "front_photo_location":null,
 *   "back_photo_location":null,
 *   "added_by":1,
 *   "is_active":true,
 *   "is_deleted":false,
 *   "inactivedAt":null,
 *   "deletedAt":null,
 *   "createdAt":"2019-08-09T04:17:25.000Z",
 *   "updatedAt":"2019-08-09T04:27:31.579Z"
 * }
 */
// #endregion

// #region [Certificate] Update certificate format photo
/**
 * @api {put} /api/certificate/format/:certificateFormatId/photo [Certificate] Update certificate format photo
 * @apiDescription Update certificate format photo
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} certificateTypeId (required) certificateTypeId passed as param
 *
 * @apiParam {File} front_photo (optional) image of front photo of certificate format
 * @apiParam {File} back_photo (optional) image of back photo of certificate format
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/certificate/format/14/photo
 *
 * @apiSuccess (Success) {Object} certificate format object updated details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  front_photo_location: uploads/mim_development/certificate-format/photo/20190808055341_flat-boy-with-violet-cloud.jpg
 *  back_photo_location: uploads/mim_development/certificate-format/photo/20190808055341_Train-Crossing-big.jpg
 * }
 */
// #endregion

// #region [Certificate] Delete certificate format
/**
 * @api {delete} /api/certificate/format/:certificateFormatId [Certificate] Delete certificate format
 * @apiDescription Delete certificate format
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} certificateTypeId (required) certificateTypeId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/certificate/format/14
 *
 * @apiSuccess (Success) {Object} certificate format deleted
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "deleted": true
 * }
 */
// #endregion

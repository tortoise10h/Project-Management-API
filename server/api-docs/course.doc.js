// #region [Course] List course
/**
 * @api {get} /api/course [Course] List course
 * @apiDescription List all course in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiParam {String} code (optional)
 * @apiParam {String} name (optional)
 * @apiParam {String} detail (optional)
 * @apiParam {Number} total_sessions (optional)
 * @apiParam {Number} session_duration (optional)
 * @apiParam {String} session_duration_in (optional)
 * @apiParam {Number} price (optional)
 * @apiParam {Number} type_cost (optional)
 * @apiParam {String} fee_currency (optional)
 * @apiParam {Boolean} is_active (optional)
 * @apiParam {Number} course_category_id (optional)
 * @apiParam {String} sort (optional) Sort by field. Default: name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 * @apiParam {String} institute_ids (optional) Array of institutes want to lookup. Ex: 1,2,3
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/course
 *  http://localhost:3000/api/course?code=C_BASIC&sort=name&direction=asc&page=1&offset=50&institute_ids=1
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "totalRecord":1,
 *   "totalPage":1,
 *   "page":1,
 *   "data":[
 *       {
 *           "id":4,
 *           "code":"C_BASIC",
 *           "name":"C Fundamentals",
 *           "excerpt": null,
 *           "detail":"C for beginner",
 *           "total_sessions":20,
 *           "session_duration":2,
 *           "session_duration_in":"hour",
 *           "price":200,
 *           "type_cost": 0,
 *           "fee_currency":"$",
 *           "institute_id":1,
 *           "course_category_id":4,
 *           "avatar_location":null,
 *           "trailer_location":null,
 *           "photo_location":null,
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-08-01T17:39:23.000Z",
 *           "updatedAt":"2019-08-01T17:39:23.000Z",
 *           "CourseCategory":{
 *               "id":4,
 *               "name":"C",
 *               "detail":"C language",
 *               "added_by":1,
 *               "is_active":true,
 *               "is_deleted":false,
 *               "inactivedAt":null,
 *               "deletedAt":null,
 *               "createdAt":"2019-08-01T17:39:22.000Z",
 *               "updatedAt":"2019-08-01T17:39:22.000Z"
 *           },
 *           "CertificateTypes":[
 *               {
 *                   "id":4,
 *                   "code":"ATVSTP",
 *                   "expire_time":7,
 *                   "duration_in":"month",
 *                   "course_id":4,
 *                   "description":null,
 *                   "certificate_format_id":4,
 *                   "added_by":1,
 *                   "is_active":true,
 *                   "is_deleted":false,
 *                   "inactivedAt":null,
 *                   "deletedAt":null,
 *                   "createdAt":"2019-08-01T17:39:29.000Z",
 *                   "updatedAt":"2019-08-01T17:39:29.000Z"
 *               }
 *           ]
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Customer] List registration of course
/**
 * @api {get} /api/course/:courseId/registration [Course] List registration of course
 * @apiDescription List registration of course
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} message (optional) filter by message of registration
 * @apiParam {String} registration_status (optional) filter by status of registration
 * @apiParam {String} customer_name (optional)filter by customer name of registration
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/course/1/registration?customer_name=Digitech&registration_status=Approved
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *    "totalRecord": 4,
 *    "totalPage": 1,
 *    "page": 1,
 *    "data": [
 *        {
 *            "id": 1,
 *            "message": "Registration #1 for customer: Digitech Global Co",
 *            "status": "New",
 *            "course_fee": 200,
 *            "total_students": 3,
 *            "total_cost": 600,
 *            "cost_currency": "$",
 *            "course_id": 1,
 *            "customer_id": 1,
 *            "added_by": 1,
*             "photo_location": null,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-06-26T08:00:13.000Z",
 *            "updatedAt": "2019-06-26T08:00:13.000Z",
 *            "Customer": {
 *                "name": "Digitech Global Co"
 *            }
 *        },
 *        {
 *            "id": 4,
 *            "message": "Registration #4 for customer: Digitech Global Co",
 *            "status": "New",
 *            "course_fee": 200,
 *            "total_students": 0,
 *            "total_cost": 0,
 *            "cost_currency": "$",
 *            "course_id": 1,
 *            "customer_id": 1,
 *            "photo_location": null,
 *            "added_by": 1,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-06-26T08:00:13.000Z",
 *            "updatedAt": "2019-06-26T08:00:13.000Z",
 *            "Customer": {
 *                "name": "Digitech Global Co"
 *            }
 *        }
 *    ]
 *}
 */
// #endregion

// #region [Course] Get course
/**
 * @api {get} /api/course/:courseId [Course] Get course
 * @apiDescription Get course information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (required) courseId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/course/1
 *
 * @apiSuccess (Success) {Object} Course object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": 1,
 *      "code": "CODENUMBER1",
 *      "name": "Course number 1",
 *      "excerpt": null,
 *      "detail": "some details",
 *      "total_sessions": 30,
 *      "session_duration": 50,
 *      "session_duration_in": "minute",
 *      "price": 9000000,
 *      "type_cost": 0,
 *      "fee_currency": "ABCD",
 *      "institute_id": 1,
 *      "course_category_id": 1,
 *      "avatar_location":null,
 *      "trailer_location":null,
 *      "photo_location": null,
 *      "added_by": 1,
 *      "is_active": true,
 *      "is_deleted": false,
 *      "inactivedAt": null,
 *      "deletedAt": null,
 *      "createdAt": "2019-02-22T12:12:12.000Z",
 *      "updatedAt": "2019-06-26T04:22:09.191Z"
 *  }
 */
// #endregion

// #region [Course] Update course
/**
 * @api {put} /api/course/:courseId [Course] Update course
 * @apiDescription Update course information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (required) courseId passed as param
 *
 * @apiParam {String} code (optional) course code max 255 characters
 * @apiParam {String} name (optional) name of course max 255 characters
 * @apiParam {String} detail (optional) detail of course
 * @apiParam {Number} total_sessions (optional) total session of course, not allow negative number
 * @apiParam {Number} session_duration (optional) duration time of course
 * @apiParam {String} session_duration_in (optional) duration time unit, valid (second, minute, hour, day, moth)
 * @apiParam {Number} price (optional) fee on unit, not allow negative number
 * @apiParam {Number} type_cost (optional) payment methods (0- by course ; 1 - by session)
 * @apiParam {String} fee_currency (optional) fee currency
 * @apiParam {Boolean} is_active (optional) active status of course (true or false)
 * @apiParam {Number} course_category_id (optional) id of course category (have to has is_active true, is_deleted false)
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/course/1
 *  {
 *      "code": "JAVA",
 *      "name": "Java basic"
 *      "detail": "some details"
 *      "total_sessions": 30
 *      "session_duration": 5
 *      "session_duration_in": "month"
 *      "price": 5000,
 *      "fee_currency": "dollar"
 *      "is_active": true
 *      "course_category_id": 1
 *  }
 *
 * @apiSuccess (Success) {Object} Course object updated details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id": 1,
 *   "code": "JAVA",
 *   "name": "Java basic course",
 *   "excerpt": null,
 *   "detail": "some details",
 *   "total_sessions": 30,
 *   "session_duration": 5,
 *   "session_duration_in": "month",
 *   "price": 5000,
 *   "type_cost": 0,
 *   "fee_currency": "dollar",
 *   "institute_id": 1,
 *   "course_category_id": 1,
 *   "avatar_location":null,
 *   "trailer_location":null,
 *   "photo_location": null,
 *   "added_by": 1,
 *   "is_active": true,
 *   "is_deleted": false,
 *   "inactivedAt": null,
 *   "deletedAt": null,
 *   "createdAt": "2012-12-12T12:12:12.000Z",
 *   "updatedAt": "2019-07-02T02:59:04.851Z"
 * }
 */
// #endregion

// #region [Course] Update course photo
/**
 * @api {put} /api/course/:courseId/photo [Course] Update course photo
 * @apiDescription Udpate course photo
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {File} photo (optional) Image file (jpg|jpeg|png|gif)
 *
 *  @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/course/5/photo
 *
 * @apiSuccess (Success) {Object} student Updated student info
 *
 */
// #endregion

// #region [Course] Add course
/**
 * @api {post} /api/institute/:instituteId/course [Course] Add course
 * @apiDescription Add course
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} instituteId (required) pass as param
 * @apiParam {File} photo (optional) photo of course
 *
 * @apiParam {String} code (required) course code
 * @apiParam {String} name (required) name
 * @apiParam {String} detail (optional) detail
 * @apiParam {Number} total_sessions (required) total sessions
 * @apiParam {Number} session_duration (required) session duration
 * @apiParam {Number} price (required) fee on unit
 * @apiParam {Number} type_cost (required) payment methods, by course(0) or by session(1)
 * @apiParam {String} fee_currency (required) fee currency
 * @apiParam {Boolean} is_active (optional) is active default true
 * @apiParam {Number} course_category_id (required) course category id
 * @apiParam {Object} certificate_type_info (optional) certificate type info to create new certificate type of course
 * @apiParam {Array} curriculum_info (optional) array of object course unit to create curriculum of course
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/institute/1/course
 *  {
 *  "code": "REACTNATIVE",
 *  "name": "Reac native crash course",
 *  "detail": "Just learn it",
 *  "total_sessions": 30,
 *  "session_duration": 9,
 *  "session_duration_in": "month",
 *  "price": 10000,
 *  "type_cost": 0,
 *  "fee_currency": "$",
 *  "is_active": true,
 *  "course_category_id": "2",
 *  "curriculum_info": [
 *   {
 *       "title": "Course overview",
 *       "summary": "Type of Sales.Common Sales Approaches",
 *       "type": "Section",
 *       "level": 0,
 *       "index": 0,
 *       "parent_id": ""
 *   },
 *   {
 *       "title": "Defined What is Javascript",
 *       "summary": "Glossary of Common Terms",
 *       "type": "Lesson",
 *       "duration": 20,
 *       "parent_id": "",
 *       "level": 0,
 *       "index": 1
 *   },
 *   {
 *       "title": "Defined What is Javascript",
 *       "summary": "Glossary of Common Terms",
 *       "type": "Lesson",
 *       "duration": 10,
 *       "parent_id": "",
 *       "index": 2,
 *       "level": 0
 *   },
 *   {
 *       "title": "Creative Openings",
 *       "summary": "A Basic Opening for Warm Calls",
 *       "type": "Section",
 *       "parent_id": "",
 *       "index": 3,
 *       "level": 0
 *   },
 *   {
 *       "title": "Handling Objections",
 *       "summary": "Common types of Objections",
 *       "type": "Lesson",
 *       "parent_id": "",
 *       "duration": 15,
 *       "level": 0,
 *       "index": 4
 *   },
 *   {
 *       "title": "Following Up",
 *       "summary": "Understanding when it's Time to Close",
 *       "type": "Lesson",
 *       "parent_id": "",
 *       "duration": 15,
 *       "level": 0,
 *       "index": 5
 *   }
 *  ]
 * }
 *
 *
 * @apiSuccess (Success) {Object} course object created
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "is_deleted":false,
 *   "id":12,
 *   "code":"REACTNATIVE",
 *   "name":"Reac native crash course",
 *   "detail":"Just learn it",
 *   "total_sessions":30,
 *   "session_duration":9,
 *   "session_duration_in":"month",
 *   "price":10000,
 *   "type_cost":1,
 *   "fee_currency":"$",
 *   "is_active":true,
 *   "course_category_id":2,
 *   "institute_id":1,
 *   "added_by":1,
 *   "updatedAt":"2019-07-22T17:26:16.988Z",
 *   "createdAt":"2019-07-22T17:26:16.988Z"
 * }
 */
// #endregion

// #region [Course] Add curriculum to course
/**
 * @api {post} /api/course/:courseId/curriculum [Course] Add curriculum to course
 * @apiDescription Add course curriculum
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Array} Array units of curriculum (required)
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/course/1/curriculum
 *  [
 *   {
 *       "title": "Course overview",
 *       "summary": "Type of Sales.Common Sales Approaches",
 *       "type": "Section",
 *       "level": 0,
 *       "index": 0,
 *       "parent_id": ""
 *   },
 *   {
 *       "title": "Defined What is Javascript",
 *       "summary": "Glossary of Common Terms",
 *       "type": "Lesson",
 *       "duration": 20,
 *       "parent_id": "",
 *       "level": 0,
 *       "index": 1
 *   },
 *   {
 *       "title": "Defined What is Javascript",
 *       "summary": "Glossary of Common Terms",
 *       "type": "Lesson",
 *       "duration": 10,
 *       "parent_id": "",
 *       "index": 2,
 *       "level": 0
 *   },
 *   {
 *       "title": "Creative Openings",
 *       "summary": "A Basic Opening for Warm Calls",
 *       "type": "Section",
 *       "index": 3,
 *       "level": 0
 *   },
 *   {
 *       "title": "Handling Objections",
 *       "summary": "Common types of Objections",
 *       "type": "Lesson",
 *       "parent_id": "",
 *       "duration": 15,
 *       "level": 0,
 *       "index": 4
 *   },
 *   {
 *       "title": "Following Up",
 *       "summary": "Understanding when it's Time to Close",
 *       "type": "Lesson",
 *       "parent_id": "",
 *       "duration": 15,
 *       "level": 0,
 *       "index": 5
 *   }
 * ]
 *
 * @apiSuccess (Success) {Array} Current curriculum created
 *
 * @apiSuccessExample {Array} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *       "id":"4-c0e94580-b1de-11e9-9201-cd6bb3f69e62",
 *       "title":"Course overview",
 *       "summary":"Type of Sales.Common Sales Approaches",
 *       "type":"Section",
 *       "level":0,
 *       "index":0,
 *       "parent_id":"",
 *       "course_id":4,
 *       "added_by":1
 *   },
 *   {
 *       "id":"4-c0e94581-b1de-11e9-9201-cd6bb3f69e62",
 *       "title":"Defined What is Javascript",
 *       "summary":"Glossary of Common Terms",
 *       "type":"Lesson",
 *       "duration":20,
 *       "parent_id":"",
 *       "level":0,
 *       "index":1,
 *       "course_id":4,
 *       "added_by":1
 *   },
 *   {
 *       "id":"4-c0e94582-b1de-11e9-9201-cd6bb3f69e62",
 *       "title":"Defined What is Javascript",
 *       "summary":"Glossary of Common Terms",
 *       "type":"Lesson",
 *       "duration":10,
 *       "parent_id":"",
 *       "index":2,
 *       "level":0,
 *       "course_id":4,
 *       "added_by":1
 *   },
 *   {
 *       "id":"4-c0e94583-b1de-11e9-9201-cd6bb3f69e62",
 *       "title":"Creative Openings",
 *       "summary":"A Basic Opening for Warm Calls",
 *       "type":"Section",
 *       "index":3,
 *       "level":0,
 *       "course_id":4,
 *       "added_by":1
 *   },
 *   {
 *       "id":"4-c0e94584-b1de-11e9-9201-cd6bb3f69e62",
 *       "title":"Handling Objections",
 *       "summary":"Common types of Objections",
 *       "type":"Lesson",
 *       "parent_id":"",
 *       "duration":15,
 *       "level":0,
 *       "index":4,
 *       "course_id":4,
 *       "added_by":1
 *   },
 *   {
 *       "id":"4-c0e94585-b1de-11e9-9201-cd6bb3f69e62",
 *       "title":"Following Up",
 *       "summary":"Understanding when it's Time to Close",
 *       "type":"Lesson",
 *       "parent_id":"",
 *       "duration":15,
 *       "level":0,
 *       "index":5,
 *       "course_id":4,
 *       "added_by":1
 *   }
 * ]
 */
// #endregion

// #region [Course] get curriculum of course
/**
 * @api {get} /api/course/:courseId/curriculum [Course] Get curriculum of course
 * @apiDescription Get course curriculum
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} max_level (optional) Max level of curriculum
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/course/1/curriculum?max_level=2
 * @apiSuccess (Success) {Array} Curriculum of course in array format
 *
 * @apiSuccessExample {Array} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *       "id":"4-c0e94580-b1de-11e9-9201-cd6bb3f69e62",
 *       "course_id":4,
 *       "title":"Course overview",
 *       "parent_id":"",
 *       "index":0,
 *       "level":0,
 *       "type":"Section",
 *       "summary":"Type of Sales.Common Sales Approaches",
 *       "duration":null,
 *       "is_visible":true,
 *       "is_deleted":false,
 *       "added_by":1,
 *       "deletedAt":null,
 *       "createdAt":"2019-07-29T08:56:28.000Z",
 *       "updatedAt":"2019-07-29T08:56:28.000Z"
 *   },
 *   {
 *       "id":"4-c0e94581-b1de-11e9-9201-cd6bb3f69e62",
 *       "course_id":4,
 *       "title":"Defined What is Javascript",
 *       "parent_id":"",
 *       "index":1,
 *       "level":0,
 *       "type":"Lesson",
 *       "summary":"Glossary of Common Terms",
 *       "duration":20,
 *       "is_visible":true,
 *       "is_deleted":false,
 *       "added_by":1,
 *       "deletedAt":null,
 *       "createdAt":"2019-07-29T08:56:28.000Z",
 *       "updatedAt":"2019-07-29T08:56:28.000Z"
 *   },
 *   {
 *       "id":"4-c0e94582-b1de-11e9-9201-cd6bb3f69e62",
 *       "course_id":4,
 *       "title":"Defined What is Javascript",
 *       "parent_id":"",
 *       "index":2,
 *       "level":0,
 *       "type":"Lesson",
 *       "summary":"Glossary of Common Terms",
 *       "duration":10,
 *       "is_visible":true,
 *       "is_deleted":false,
 *       "added_by":1,
 *       "deletedAt":null,
 *       "createdAt":"2019-07-29T08:56:28.000Z",
 *       "updatedAt":"2019-07-29T08:56:28.000Z"
 *   },
 *   {
 *       "id":"4-c0e94583-b1de-11e9-9201-cd6bb3f69e62",
 *       "course_id":4,
 *       "title":"Creative Openings",
 *       "parent_id":"",
 *       "index":3,
 *       "level":0,
 *       "type":"Section",
 *       "summary":"A Basic Opening for Warm Calls",
 *       "duration":null,
 *       "is_visible":true,
 *       "is_deleted":false,
 *       "added_by":1,
 *       "deletedAt":null,
 *       "createdAt":"2019-07-29T08:56:28.000Z",
 *       "updatedAt":"2019-07-29T08:56:28.000Z"
 *   },
 *   {
 *       "id":"4-c0e94584-b1de-11e9-9201-cd6bb3f69e62",
 *       "course_id":4,
 *       "title":"Handling Objections",
 *       "parent_id":"",
 *       "index":4,
 *       "level":0,
 *       "type":"Lesson",
 *       "summary":"Common types of Objections",
 *       "duration":15,
 *       "is_visible":true,
 *       "is_deleted":false,
 *       "added_by":1,
 *       "deletedAt":null,
 *       "createdAt":"2019-07-29T08:56:28.000Z",
 *       "updatedAt":"2019-07-29T08:56:28.000Z"
 *   },
 *   {
 *       "id":"4-c0e94585-b1de-11e9-9201-cd6bb3f69e62",
 *       "course_id":4,
 *       "title":"Following Up",
 *       "parent_id":"",
 *       "index":5,
 *       "level":0,
 *       "type":"Lesson",
 *       "summary":"Understanding when it's Time to Close",
 *       "duration":15,
 *       "is_visible":true,
 *       "is_deleted":false,
 *       "added_by":1,
 *       "deletedAt":null,
 *       "createdAt":"2019-07-29T08:56:28.000Z",
 *       "updatedAt":"2019-07-29T08:56:28.000Z"
 *   }
 * ]
 */
// #endregion

// #region [Course] List certificate type
/**
 * @api {get} /api/course/:courseId/certificateType [Course] List certificate type of course
 * @apiDescription List certificate types of course
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (required) courseId passed as param
 *
 * @apiParam {String} code (optional) Code of certificate
 * @apiParam {Number} expire_time (optional) expire time of certificate
 * @apiParam {String} duration_in (optional) duration unit of certficate available (month, year)
 * @apiParam {String} description (optional) description of certificate
 * @apiParam {Boolean} is_active (optional) certificate active or not (truem or false)
 * @apiParam {String} sort (optional) Sort by field. Default: code
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 50. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/course/9/certificateType
 *  http://localhost:3000/api/course/9/certificateType?offset=1&page=1&sort=expire_time&direction=DESC
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *    "totalRecord": 1,
 *    "totalPage": 1,
 *    "page": 1,
 *    "data": [
 *        {
 *            "id": 1,
 *            "code": "JAVA",
 *            "expire_time": 4,
 *            "duration_in": "year",
 *            "course_id": 1,
 *            "description": null,
 *            "added_by": 1,
 *            "is_active": true,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-07-21T05:15:27.000Z",
 *            "updatedAt": "2019-07-21T05:15:27.000Z",
 *            "Course": {
 *                "id": 1,
 *                "code": "JAVA_BASIC",
 *                "name": "Java Fundamentals",
 *                "detail": "Java for beginner",
 *                "total_sessions": 20,
 *                "session_duration": 2,
 *                "session_duration_in": "hour",
 *                "price": 200,
 *                "type_cost": 1,
 *                "fee_currency": "$",
 *                "institute_id": 1,
 *                "course_category_id": 1
 *            }
 *        }
 *    ]
 *}
 */
// #endregion

// #region [Course] Add new certificate type of course
/**
 * @api {post} /api/course/:courseId/certificateType [CertificateType] Add new certificate type of course
 * @apiDescription Add certificate type infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (required) courseId passed as param
 *
 * @apiParam {File} code (optional) certificate type image
 *
 * @apiParam {String} code (required) certificate type code
 * @apiParam {Number} expire_time (required) expire time of certificate, if expire time = 0 that's mean expire time is infinity
 * @apiParam {String} duration_in (required) certificate duration in, valid (month, year)
 * @apiParam {String} description (optional) description of certificate
 * @apiParam {Boolean} is_active (optional) default is true
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/certificate/type
 * {
 *   "code": "ASSEMBLY",
 *   "expire_time": 10,
 *   "duration_in": "year",
 *   "is_active": true,
 *   "certificate_format_id":2
 * }
 *
 * @apiSuccess (Success) {Object} created certificate type info
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "is_deleted":false,
 *   "id":10,
 *   "code":"ASSEMBLY",
 *   "expire_time":10,
 *   "duration_in":"year",
 *   "is_active":true,
 *   "certificate_format_id":2,
 *   "added_by":1,
 *   "course_id":3,
 *   "updatedAt":"2019-08-01T17:49:39.691Z",
 *   "createdAt":"2019-08-01T17:49:39.691Z"
 * }
 */
// #endregion

// #region [Course] Update course unit
/**
 * @api {put} /api/course/:courseId/curriculum/:courseUnitId [Course] Update course course unit
 * @apiDescription Update course information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (required) courseId passed as param
 * @apiParam {Number} courseUnitId (required) courseUnitId passed as param
 *
 * @apiParam {Number} index (optional) course code max 255 characters
 * @apiParam {String} title (optional) name of course max 255 characters
 * @apiParam {Number} level (optional) detail of course
 * @apiParam {String} parent_id (optional) total session of course, not allow negative number
 * @apiParam {String} type (optional) duration time of course
 * @apiParam {String} summary (optional) duration time unit, valid (second, minute, hour, day, moth)
 * @apiParam {Number} duration (optional) fee on unit, not allow negative number
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/course/10/10-263d4f91-b75b-11e9-9cac-9f0747dd19b4
 *  {
 *      "title": "This is a long title for test",
 *      "summary": "This is a short description for test too"
 *  }
 *
 * @apiSuccess (Success) {Object} Course unit object updated details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id":"10-263d4f91-b75b-11e9-9cac-9f0747dd19b4",
 *   "course_id":10,
 *   "title":"This is a long title for test",
 *   "parent_id":"",
 *   "index":1,
 *   "level":0,
 *   "type":"Section",
 *   "summary":"This is a short description for test too",
 *   "duration":null,
 *   "is_visible":true,
 *   "is_deleted":false,
 *   "added_by":1,
 *   "deletedAt":"2019-08-07T11:32:59.000Z",
 *   "createdAt":"2019-08-05T08:29:32.000Z",
 *   "updatedAt":"2019-08-07T11:40:08.674Z"
 * }
 */
// #endregion

// #region [Course] Delete course unit
/**
 * @api {delete} /api/course/:courseId/curriculum/:courseUnitId [Course] Delete course course unit
 * @apiDescription Update course information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (required) courseId passed as param
 * @apiParam {Number} courseUnitId (required) courseUnitId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/course/10/10-263d4f91-b75b-11e9-9cac-9f0747dd19b4
 *
 * @apiSuccess (Success) {Object} Delete course unit successfully
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "is_deleted": true
 * }
 */
// #endregion

// #region [Course] List document
/**
 * @api {get} /api/course/:courseId/document [Course] List document
 * @apiDescription Get list document
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/shift
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Array} All study shift in system
 *
 * @apiSuccessExample {Array} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "count":14,
 *   "rows":[
 *       {
 *           "id":7,
 *           "start_time":"07:30:00",
 *           "end_time":"09:30:00",
 *           "day_of_week":0,
 *           "center_id":1,
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-08-21T14:40:57.000Z",
 *           "updatedAt":"2019-08-21T14:40:57.000Z"
 *       },
 *       {
 *           "id":14,
 *           "start_time":"10:00:00",
 *           "end_time":"11:30:00",
 *           "day_of_week":0,
 *           "center_id":1,
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-08-21T14:40:57.000Z",
 *           "updatedAt":"2019-08-21T14:40:57.000Z"
 *       },
 *       ....
 *   ]
 * }
 */
// #endregion

// #region [Document] Add new document
/**
 * @api {post} /api/course/:courseId/document [Course] Add new document
 * @apiDescription Add new document
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Numver} courseId (required) courseId passed as param
 *
 * @apiParam {String} name (required) name of document
 * @apiParam {String} license (required) license of document
 * @apiParam {Boolean} is_active (optional) active status of document, default true
 * @apiParam {File} document (optional) document file
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/center/1/shift
 *   {
 *    "name": "Document 2 of huy",
 *    "license": "license 1",
 *   }
 *
 * @apiSuccess (Success) {Object} new document created
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "is_deleted": false,
 *   "id": 3,
 *   "name": "Document 2 of huy",
 *   "license": "license 1",
 *   "is_active": true,
 *   "location": "uploads/mim_development/course/document/20190822024625_new-doc-2019-04-19-15.54.06_20190521230721.pdf",
 *   "added_by": 1,
 *   "course_id": 4,
 *   "updatedAt": "2019-08-22T02:46:26.046Z",
 *   "createdAt": "2019-08-22T02:46:26.046Z"
 * }
 */
// #endregion

// #region [Course] Update document
/**
 * @api {PUT} /api/course/:courseId/document/:documentId [Course] Update document info
 * @apiDescription Update info of a existing document
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (requried) courseId passed as param
 * @apiParam {Number} documentId (requried) documentId passed as param
 *
 * @apiParam {String} name (optional) Name of document
 * @apiParam {String} license (optional) License of document
 * @apiParam {Booleam} is_active (optional) Active status of document
 * @apiParam {File} document (optional) FIle of document
 *
 * @apiParamExample {json} First Request-Example
 *  http://localhost:3001/course/4/document/1
 * {
 *   "name": "Document 2 of huy updated",
 *   "license": "license 1 updated"
 * }
 *
 * @apiSuccess (Success) {Object} updated document object
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "course_id": 4,
 *   "name": "Document 2 of huy updated",
 *   "location": null,
 *   "license": "license 1 updated",
 *   "is_active": true,
 *   "is_deleted": false,
 *   "added_by": 1,
 *   "inactivedAt": null,
 *   "deletedAt": null,
 *   "createdAt": "2019-08-22T02:35:54.000Z",
 *   "updatedAt": "2019-08-22T03:04:45.480Z"
 * }
 */
// #endregion

// #region [Corse] Get document by id
/**
 * @api {get} /api/course/:courseId/document/:documentId [Course] Get document by id
 * @apiDescription Get document information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (requried) courseId passed as param
 * @apiParam {Number} documentId (requried) documentId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/course/4/document/1
 *
 * @apiSuccess (Success) {Object} Study shift object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "course_id": 4,
 *   "name": "Document 2 of huy updated",
 *   "location": null,
 *   "license": "license 1 updated",
 *   "is_active": true,
 *   "is_deleted": false,
 *   "added_by": 1,
 *   "inactivedAt": null,
 *   "deletedAt": null,
 *   "createdAt": "2019-08-22T02:35:54.000Z",
 *   "updatedAt": "2019-08-22T03:04:45.000Z"
 * }
 */
// #endregion

// #region [Course] Delete document
/**
 * @api {DELETE} /api/course/:courseId/document/:documentId [Course] Delete document
 * @apiDescription Delete a document
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} courseId (requried) courseId passed as param
 * @apiParam {Number} documentId (requried) documentId passed as param
 *
 * @apiParamExample {json} First Request-Example
 *  http://localhost:3001/api/course/4/document/1
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "deleted": true
 * }
 */

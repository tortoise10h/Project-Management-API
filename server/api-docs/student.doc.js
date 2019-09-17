// #region [Student] List student
/**
 * @api {get} /api/student [Student] List student
 * @apiDescription List all student in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} id (optional) Id of student
 * @apiParam {String} name (optional) For search both last name and fist namer of student
 * @apiParam {String} gender (optional) Gender of student (male, female)
 * @apiParam {String} date_of_birth (optional) Birthday of student
 * @apiParam {String} identifier (optional) Identifier of student
 * @apiParam {String} address (optional) Address of student
 * @apiParam {String} city (optional) City of student
 * @apiParam {String} zip (optional) Zip code
 * @apiParam {String} phone (optional) Phone number of student
 * @apiParam {String} email (optional) Email of student
 * @apiParam {String} position (optional) Position of student
 * @apiParam {String} customer_name (optional) customer name of student
 * @apiParam {String} nationality (optional) Nationality of student
 * @apiParam {Boolean} is_active (optional) Active status of student
 *
 * @apiParam {String} sort (optional) Sort by field. Default: first_name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/student
 *  http://localhost:3000/api/student?sort=first_name&direction=asc&page=1&offset=50&id=S-0000000&gender=male&city=TPHC&name=tưởng
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
 *           "student":{
 *               "id":"S-00000001",
 *               "first_name":"Văn Tưởng",
 *               "last_name":"Trần",
 *               "gender":"male",
 *               "date_of_birth":"1993-12-20",
 *               "identifier":"231567893454",
 *               "address":"200 Trần Duật, Quận 1",
 *               "city":"TPHCM",
 *               "country":"Việt Nam",
 *               "zip":"70000",
 *               "photo_location":null,
 *               "phone":"+845469546546",
 *               "email":"vantuong@digitechglobalco.com",
 *               "position":"Employee",
 *               "nationality":"Japanese",
 *               "userid":7,
 *               "added_by":1,
 *               "is_active":true,
 *               "is_deleted":false,
 *               "inactivedAt":null,
 *               "deletedAt":null,
 *               "createdAt":"2019-07-28T01:14:26.000Z",
 *               "updatedAt":"2019-07-28T01:14:26.000Z"
 *           },
 *           "customer_info":[
 *               {
 *                   "id":1,
 *                   "type":"COMPANY",
 *                   "name":"Digitech Global Co",
 *                   "address":"HCM",
 *                   "phone":"0903211315",
 *                   "email":"business1@digitechglobalco.com",
 *                   "extra_details":"Công ty TNHH Digitech Solutions",
 *                   "contact_person":"Tony Hoang",
 *                   "short_name":"DGS",
 *                   "userid":2,
 *                   "identifier":null,
 *                   "zip_code":"DGSZIP",
 *                   "added_by":1,
 *                   "is_active":true,
 *                   "is_deleted":false,
 *                   "inactivedAt":null,
 *                   "deletedAt":null,
 *                   "createdAt":"2019-07-28T01:14:24.000Z",
 *                   "updatedAt":"2019-07-28T01:14:24.000Z",
 *                   "relationship":"EMPLOYER"
 *               }
 *           ]
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Student] Get student
/**
 * @api {get} /api/student/:studentId [Student] Get student
 * @apiDescription Get student infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} studentId (required) studentId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/student/S-00000005
 *
 * @apiSuccess (Success) {Object} student object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id":"S-00000005",
 *   "first_name":"Captain",
 *   "last_name":"Ameria",
 *   "gender":"female",
 *   "date_of_birth":"1993-09-15",
 *   "identifier":"2311256789854",
 *   "address":"999 End Game",
 *   "city":"San Diego",
 *   "country":"United States",
 *   "zip":"70000",
 *   "photo_location":null,
 *   "phone":"+8415469546456",
 *   "email":"captainameria@digitechglobalco.com",
 *   "position":null,
 *   "nationality":"Japanese",
 *   "userid":11,
 *   "added_by":1,
 *   "is_active":true,
 *   "is_deleted":false,
 *   "inactivedAt":null,
 *   "deletedAt":null,
 *   "createdAt":"2019-07-28T01:14:27.000Z",
 *   "updatedAt":"2019-07-28T01:14:27.000Z",
 *   "Customer":{
 *       "id":2,
 *       "type":"COMPANY",
 *       "name":"Avenger",
 *       "address":"Hà Nội",
 *       "phone":"0903211315",
 *       "email":"business@avenger.com",
 *       "extra_details":"Công ty TNHH Avenger US",
 *       "contact_person":"Mr. Stark",
 *       "short_name":"AVG",
 *       "userid":3,
 *       "identifier":null,
 *       "zip_code":"AVGZIP",
 *       "added_by":1,
 *       "is_active":true,
 *       "is_deleted":false,
 *       "inactivedAt":null,
 *       "deletedAt":null,
 *       "createdAt":"2019-07-28T01:14:25.000Z",
 *       "updatedAt":"2019-07-28T01:14:25.000Z"
 *   }
 * }
 */
// #endregion

// #region [Customer] Update student
/**
 * @api {put} /api/student/:studentId [Student] Update student
 * @apiDescription Udpate student information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} first_name (optional) first name
 * @apiParam {String} last_name (optional) last name
 * @apiParam {String} gender (optional) gender: male, female, other
 * @apiParam {Date} date_of_birth (optional) date of birth
 * @apiParam {String} address (optional) address
 * @apiParam {String} identifier (optional) identify card number or passport number
 * @apiParam {String} city (optional) city
 * @apiParam {String} country (optional) country
 * @apiParam {String} zip (optional) zip code
 * @apiParam {String} phone (optional) phone number
 * @apiParam {String} email (optional) email address
 * @apiParam {String} position (optional) position of student
 * @apiParam {Boolean} is_active (optional) set = false to deactive user
 *
 *  @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/student/5
 * {
 *   "first_name": "Hulk",
 *   "last_name": "Banner",
 *   "gender": "other",
 *   "date_of_birth": "1993-12-20",
 *   "address": "Avenger Tower",
 *   "email": "hulkbanner@digitechglobalco.com",
 *   "position": "captain",
 *   "nationality": "Vietnamese",
 * }
 *
 * @apiSuccess (Success) {Object} student Updated student info
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "S-00000006",
 *   "first_name": "Hulk",
 *   "last_name": "Banner",
 *   "gender": "other",
 *   "date_of_birth": "1993-12-20",
 *   "identifier": "+1241223156789854",
 *   "address": "Avenger Tower",
 *   "city": "San Diego",
 *   "country": "United States",
 *   "zip": "70000",
 *   "photo_location": null,
 *   "phone": "+8415469514656",
 *   "email": "hulkbanner@digitechglobalco.com",
 *   "position": "captain",
 *   "nationality": "Vietnamese",
 *   "userid": 12,
 *   "added_by": 1,
 *   "is_active": true,
 *   "is_deleted": false,
 *   "inactivedAt": null,
 *   "deletedAt": null,
 *   "createdAt": "2019-07-04T10:53:57.000Z",
 *   "updatedAt": "2019-07-04T10:59:46.926Z"
 * }
 */
// #endregion

// #region [Customer] Update student photo
/**
 * @api {put} /api/student/:studentId/photo [Student] Update student photo
 * @apiDescription Udpate student photo
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {File} photo (optional) Image file (jpg|jpeg|png|gif)
 *
 *  @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/student/5/photo
 *
 * @apiSuccess (Success) {Object} student Updated student info
 *
 */
// #endregion

// #region [Student] Search student
/**
 * @api {get} /api/student/search [Student] Search student
 * @apiDescription Search student by all fields
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} first_name (optional) First name of student
 * @apiParam {String} last_name (optional) Last name of student
 * @apiParam {String} gender (optional) Gender of student valid in: male, female and other
 * @apiParam {String} date_of_birth (optional) Date of birth
 * @apiParam {String} address (optional) Address
 * @apiParam {String} identifier (optional) Identifier
 * @apiParam {String} city (optional) City
 * @apiParam {String} country (optional) Country
 * @apiParam {String} zip (optional) Zip
 * @apiParam {String} phone (optional) Phone number
 * @apiParam {String} email (optional) Email of student valid min domain segment 2
 * @apiParam {String} position (optional) position of student
 * @apiParam {String} is_active (optional) student is_active
 * @apiParam {String} sort (optional) Sort by field. Default: first_name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 50. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/student/search?is_active=true&country=vietnam&gender=male
 *
 * @apiSuccess (Success) {Object} Student object details paginated
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *    "totalRecord": 2,
 *    "totalPage": 1,
 *    "page": 1,
 *    "data": [
 *        {
 *            "id": "1",
 *            "first_name": "huy",
 *            "last_name": "nguyen",
 *            "gender": "male",
 *            "date_of_birth": "1999-10-02",
 *            "identifier": "IDONTKNOW",
 *            "address": "le van quoi, binh tan",
 *            "city": "ho chi minh",
 *            "country": "viet nam",
 *            "zip": null,
 *            "photo_location": null,
 *            "phone": "0123456789",
 *            "email": "tortoise10h@gmail.com",
 *            "position": "Master",
 *            "nationality": "Vietnamese",
 *            "userid": null,
 *            "added_by": null,
 *            "is_active": true,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-12-12T12:12:12.000Z",
 *            "updatedAt": "2019-12-12T12:12:12.000Z"
 *        },
 *        {
 *            "id": "2",
 *            "first_name": "nana",
 *            "last_name": "nguyen",
 *            "gender": "female",
 *            "date_of_birth": "1999-12-12",
 *            "identifier": "ZIAZIA",
 *            "address": "phan anh",
 *            "city": "ho chi minh",
 *            "country": "viet nam",
 *            "zip": null,
 *            "photo_location": null,
 *            "phone": "0123456798",
 *            "email": "nana@gmail.com",
 *            "position": "Master",
 *            "nationality": "Vietnamese",
 *            "userid": null,
 *            "added_by": null,
 *            "is_active": true,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-12-12T12:12:12.000Z",
 *            "updatedAt": "2019-12-12T12:12:12.000Z"
 *        }
 *    ]
 * }
 */
// #endregion

// #region [Student] Get list class by student id
/**
 * @api {get} /api/student/:studentId/class [Student] Get class by student id
 * @apiDescription Get class by student id
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} studentId (required) studentId passed as param
 *
 * @apiParam {String} status (optional) Sort by field. Default: name
 * @apiParam {String} course_id (optional) Sort direction. Defaullt: asc
 * @apiParam {String} sort (optional) Sort by field. Default: name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 50. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/student/S-00000001/class?sort=name&direction=asc&page=1&offset=50
 *  http://localhost:3000/api/student/S-00000001/class?status=Completed
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Array} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "totalRecord":1,
 *  "totalPage":1,
 *  "page":1,
 *  "data":[
 *      {
 *          "id":7,
 *          "theory_marks":1,
 *          "practice_marks":2,
 *          "final_result_level":"Failed",
 *          "class_id":"CLS-RUBY_BASIC-00001",
 *          "student_id":"S-00000001",
 *          "issued":false,
 *          "added_by":1,
 *          "is_active":true,
 *          "is_deleted":false,
 *          "inactivedAt":null,
 *          "deletedAt":null,
 *          "createdAt":"2019-08-08T09:59:45.000Z",
 *          "updatedAt":"2019-08-08T10:00:42.000Z",
 *          "Class":{
 *              "id":"CLS-RUBY_BASIC-00001",
 *              "name":"Ruby with Huy",
 *              "status":"Completed",
 *              "session_studied": 0,
 *              "total_students":4,
 *              "total_teachers":2,
 *              "capacity":50,
 *              "start_date":"2019-08-09",
 *              "end_date":"2019-09-13",
 *              "course_id":8,
 *              "center_id":1,
 *              "teacher_assigned":true,
 *              "certification_organization":null,
 *              "added_by":1,
 *              "is_active":true,
 *              "is_deleted":false,
 *              "inactivedAt":null,
 *              "deletedAt":null,
 *              "createdAt":"2019-08-08T09:59:45.000Z",
 *              "updatedAt":"2019-08-08T10:00:47.000Z",
 *              "Course":{
 *                  "id":8,
 *                  "code":"RUBY_BASIC",
 *                  "name":"Ruby Fundamentals",
 *                  "detail":"Ruby for beginner",
 *                  "total_sessions":20,
 *                  "session_duration":2,
 *                  "session_duration_in":"hour",
 *                  "price":200,
 *                  "type_cost":0,
 *                  "fee_currency":"$",
 *                  "institute_id":1,
 *                  "course_category_id":8,
 *                  "photo_location":null,
 *                  "added_by":1,
 *                  "is_active":true,
 *                  "is_deleted":false,
 *                  "inactivedAt":null,
 *                  "deletedAt":null,
 *                  "createdAt":"2019-08-08T09:51:17.000Z",
 *                  "updatedAt":"2019-08-08T09:51:17.000Z"
 *              }
 *          }
 *      }
 *  ]
 *}
 */
// #endregion

// #region [Student] Get class by student id
/**
 * @api {get} /api/student/:studentId/class/:classId [Student] Get class by student id
 * @apiDescription Get class by student id
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/student/S-00000003/class/CLS-RUBY_BASIC-00001
 *
 * @apiSuccess (Success) {Object} data class + certificate + certificate type
 *
 * @apiSuccessExample {Array} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id":9,
 *   "theory_marks":8,
 *   "practice_marks":8,
 *   "final_result_level":"Excellent",
 *   "class_id":"CLS-RUBY_BASIC-00001",
 *   "student_id":"S-00000003",
 *   "issued":true,
 *   "is_active":true,
 *   "Class":{
 *       "id":"CLS-RUBY_BASIC-00001",
 *       "name":"Ruby with Huy",
 *       "status":"Completed",
 *       "session_studied": 0,
 *       "total_students":4,
 *       "total_teachers":2,
 *       "capacity":50,
 *       "start_date":"2019-08-09",
 *       "end_date":"2019-09-13",
 *       "course_id":8,
 *       "center_id":1,
 *       "teacher_assigned":true,
 *       "certification_organization":null,
 *       "is_active":true
 *   },
 *   "IssueCertificates":[
 *       {
 *           "id":2,
 *           "code":"2.MANAGING_SAFELY.S-00000003",
 *           "certificate_type_id":8,
 *           "effected_date":"2019-08-21",
 *           "is_active":true,
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

// #region [Student] List student of customer not registration
/**
 * @api {get} /api/customer/:customerId/notInRegistration [Student] List student of customer not in registration
 * @apiDescription List all student of customer not in registration
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} registration_id (required) registration id
 *
 * @apiParam {String} sort (optional) Sort by field. Default: createdAt
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/customer/1/notInRegistration?registration_id=REG-PASCAL_BASIC-00002&offset=1
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "totalRecord":93,
 *  "totalPage":93,
 *  "page":1,
 *  "data":[
 *     {
 *        "id":"S-00000001",
 *        "first_name":"Văn Tưởng",
 *        "last_name":"Trần",
 *        "gender":"male",
 *        "date_of_birth":1993,
 *        "identifier":"231593454",
 *        "address":"200 Trần Duật, Quận 1",
 *        "city":"TPHCM",
 *        "country":"Việt Nam",
 *        "zip":"70000",
 *        "photo_location":null,
 *        "phone":"0918447836",
 *        "email":"vantuong@digitechglobalco.com",
 *        "position":"Employee",
 *        "nationality":"Japanese",
 *        "userid":7,
 *        "added_by":1,
 *        "is_active":true,
 *        "is_deleted":false,
 *        "inactivedAt":null,
 *        "deletedAt":null,
 *        "createdAt":"2019-08-08T09:51:16.000Z",
 *        "updatedAt":"2019-08-08T09:51:16.000Z"
 *     }
 *  ]
 * }
 */
// #endregion

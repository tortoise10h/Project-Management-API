// #region [Teacher] Get teacher
/**
 * @api {get} /api/teacher/:teacherId [Teacher] Get teacher
 * @apiDescription Get teacher infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} teacherId (required) teacherId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/teacher/TEA-00000001
 *
 * @apiSuccess (Success) {Object} Teacher object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": "TEA-00000001",
 *      "fullname": "Tran Van A",
 *      "date_of_birth": "2019-06-07",
 *      "identifier": "344103117",
 *      "address": "address103117",
 *      "phone": "123456789",
 *      "email": "vanabcd@gmail.com",
 *      "position": "Giao vien truong",
 *      "qualification": "chat luong",
 *      "added_by": 1,
 *      "is_active": true,
 *      "is_deleted": false,
 *      "inactivedAt": null,
 *      "deletedAt": null,
 *      "createdAt": "2019-06-25T16:23:28.000Z",
 *      "updatedAt": "2019-06-25T16:34:49.341Z"
 *  }
 */
// #endregion

// #region [Teacher] Add teacher
/**
 * @api {post} /api/teacher [Teacher] Add teacher
 * @apiDescription Add new teacher
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} fullname (required) full name of teacher, max 255
 * @apiParam {String} gender (required) gender of teacher, valid (male, female and other)
 * @apiParam {Date} date_of_birth (required) birth day of teacher
 * @apiParam {String} identifier (required) identifier of teacher, max 255
 * @apiParam {String} address (optional) address of teacher
 * @apiParam {String} phone (required) phone number of teacher, max 255
 * @apiParam {String} email (required) email of teacher, min domain segment 2, max length 255
 * @apiParam {String} position (optional) position of teacher
 * @apiParam {String} qualification (optional) qualification
 * @apiParam {Boolean} is_active (optional) active status of student, default true
 * @apiParam {Object} login_info (required) login infomation. Pass this object to post data to create user credential
 * @apiParam {String} login_info.username (required) username, max 255
 * @apiParam {String} login_info.password (required) password, max 255
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "fullname": "John Doe",
 *      "gender": "male",
 *      "date_of_birth": "1990-01-01",
 *      "identifier": "0123456676142",
 *      "address": "New York city",
 *      "phone": "0987654321",
 *      "email": "johndoe@gmail.com",
 *      "position": "super teacher",
 *      "is_active": true,
 *      "login_info": {
 *          "username": "johndoe",
 *          "password": "123456"
 *      }
 *  }
 *
 * @apiSuccess (Success) {Object} Teacher created success
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "is_deleted": false,
 *   "id": "TEA-00000003",
 *   "fullname": "John Doe",
 *   "gender": "male",
 *   "date_of_birth": "1990-01-01",
 *   "identifier": "0123456676142",
 *   "phone": "0987654321",
 *   "address": "New York city",
 *   "email": "johndoe@gmail.com",
 *   "position": "super teacher",
 *   "is_active": true,
 *   "added_by": 1,
 *   "userid": 4,
 *   "updatedAt": "2019-07-06T16:50:05.185Z",
 *   "createdAt": "2019-07-06T16:50:05.185Z"
 * }
 */
// #endregion

// #region [Teacher] List teacher
/**
 * @api {get} /api/teacher [Teacher] List teacher
 * @apiDescription List all teacher in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} sort (optional) Sort by field. Default: fullname
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParam {String} id (optional) Id of teacher
 * @apiParam {String} fullname (optional) Full name of teacher, max 255
 * @apiParam {String} gender (optional) Gender of teacher, valid in (male, female and other)
 * @apiParam {Date} date_of_birth (optional) Birth day of teacher
 * @apiParam {String} identifier (optional) Identifier of teacher, max 255
 * @apiParam {String} address (optional) Address of teacher
 * @apiParam {String} phone (optional) Phone number of teacher, max 255
 * @apiParam {String} email (optional) Email of teacher, min domain segment 2, max length 255
 * @apiParam {String} position (optional) Position of teacher
 * @apiParam {String} qualification (optional) qualification
 * @apiParam {String} class_id (optional) Pass this to list all teacher of specific class (follow by class_id)
 * @apiParam {Boolean} is_active (optional) Active status of teacher
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/teacher
 *  http://localhost:3000/api/teacher?fullname=john&address=new yo&is_active=true&gender=female
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "totalRecord": 1,
 *   "totalPage": 1,
 *   "page": 1,
 *   "data": [
 *       {
 *           "id": "TEA-00000003",
 *           "fullname": "John Doe",
 *           "gender": "female",
 *           "date_of_birth": "1990-01-01",
 *           "identifier": "0123456676142",
 *           "address": "New York city",
 *           "phone": "0987654321",
 *           "email": "johndoe@gmail.com",
 *           "position": "super teacher",
 *           "qualification": null,
 *           "userid": 4,
 *           "added_by": 1,
 *           "is_active": true,
 *           "is_deleted": false,
 *           "inactivedAt": null,
 *           "deletedAt": null,
 *           "createdAt": "2019-07-06T16:50:05.000Z",
 *           "updatedAt": "2019-07-06T16:50:05.000Z"
 *       }
 *   ]
 * }
 */
// #endregion


// #region [Teacher] Update teacher
/**
 * @api {put} /api/teacher/:teacherId [Teacher] Update teacher
 * @apiDescription Update teacher infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} teacherId (required) teacherId passed as param
 * @apiParam {String} fullname (optional) full name of teacher, max 255
 * @apiParam {String} gender (optional) Gender of teacher, valid in (male, femail and other)
 * @apiParam {Date} date_of_birth (optional) Birthday of teacher
 * @apiParam {String} identifier (optional) Identifier of teacher, max 255
 * @apiParam {String} address (optional) Address of teacher
 * @apiParam {String} phone (optional) Phone number of teacher, max 255
 * @apiParam {String} email (optional) Email of teacher, min domain segment 2, max length 255
 * @apiParam {String} position (optional) Position of teacher
 * @apiParam {String} qualification (optional) qualification
 * @apiParam {Boolean} is_active (optional) set false to deactive teacher
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/teacher/TEA-00000002
 *  {
 *   "fullname": "Nguyen tan hihi",
 *   "gender": "male",
 *   "date_of_birth": "1992-10-02",
 *   "identifier": "74292499239",
 *   "address": "Lê Văn Quới",
 *   "phone": "0123456788",
 *   "email": "hihihi@gmail.com",
 *   "position": "super teacher",
 *   "nationality": "Vietnamese",
 *   "is_active": true,
 * }
 *
 * @apiSuccess (Success) {Object} teacher Updated teacher info
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id": "TEA-00000002",
 *   "fullname": "Nguyen tan hihi",
 *   "gender": "male",
 *   "date_of_birth": "1992-10-02",
 *   "identifier": "74292499239",
 *   "address": "Lê Văn Quới",
 *   "phone": "0123456788",
 *   "email": "hihihi@gmail.com",
 *   "position": "super teacher",
 *   "qualification": null,
 *   "userid": 3,
 *   "added_by": 1,
 *   "is_active": true,
 *   "is_deleted": false,
 *   "inactivedAt": null,
 *   "deletedAt": null,
 *   "createdAt": "2019-07-06T14:36:16.000Z",
 *   "updatedAt": "2019-07-08T02:46:54.493Z"
 * }
 */
// #endregion

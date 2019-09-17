// #region [Registration] List registration
/**
 * @api {get} /api/registration [Registration] List all registrations with pagination
 * @apiDescription List all registrations in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} status (optional) status filter. Valid: New, Processing, Approved, Declined, Recognized.
 * @apiParam {String} customer_id (optional) customer id
 * @apiParam {Number} course_id (optional) course id
 * @apiParam {String} customer_name (optional) customer name of registration
 * @apiParam {String} course_name (optional) course name of registration
 * @apiParam {String} sort (optional) Sort by field. Default: first_name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/registration
 *  http://localhost:3001/api/registration?direction=asc&page=1&offset=50
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
*{
 *   "totalRecord": 3,
 *   "totalPage": 1,
 *   "page": 1,
 *   "data": [
 *       {
 *           "id": 3,
 *           "message": "This is registration for customer: Nguyễn Tấn Phát",
 *           "status": "New",
 *           "course_fee": 200,
 *           "total_students": 1,
 *           "total_cost": 200,
 *           "cost_currency": "$",
 *           "course_id": 3,
 *           "customer_id": 3,
 *           "added_by": 1,
 *           "is_active": true,
 *           "is_deleted": false,
 *           "inactivedAt": null,
 *           "deletedAt": null,
 *           "createdAt": "2019-06-24T18:11:15.000Z",
 *           "updatedAt": "2019-06-24T18:11:15.000Z",
 *           "Customer": {
 *               "name": "Nguyễn Tấn Phát"
 *           },
 *           "Course": {
 *               "name": "JavaScript Fundamentals"
 *           }
 *       },
 *   ]
 *}
 */
// #endregion

// #region [Registration] Add new registration
/**
 * @api {post} /api/registration [Registration] Add new registration
 * @apiDescription Add new a registration with list student in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} message (optional) Message of registration
 * @apiParam {String} course_id (require) Course ID want to register.
 * @apiParam {String} customer_id (require) Customer ID, one want register
 * @apiParam {Array} student_ids (require) At least 1 student to this registration of this course.
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/registration
 *
 * @apiSuccess (Success) {Array} data of new reigstration
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *    status: 'New',
 *    is_active: true,
 *    is_deleted: false,
 *    id: 1,
 *    message: 'This is registration for customer: Digitech Global Co',
 *    course_fee: 200,
 *    total_students: 3,
 *    total_cost: '600',
 *    cost_currency: '$',
 *    course_id: 1,
 *    customer_id: 1,
 *    added_by: 1,
 *    updatedAt: '2019-06-24T18:37:29.892Z',
 *    createdAt: '2019-06-24T18:37:29.828Z',
 *    successList:
 *    [
 *            {   id: 'S-00000001',
 *                first_name: 'Văn Tưởng',
 *                last_name: 'Trần',
 *                gender: 'male',
 *                date_of_birth: '1993-12-20',
 *                identifier: '231567893454',
 *                address: '200 Trần Duật, Quận 1',
 *                city: 'TPHCM',
 *                country: 'Việt Nam',
 *                zip: '70000',
 *                photo_location: null,
 *                phone: '+845469546546',
 *                email: 'vantuong@digitechglobalco.com',
 *                userid: 7,
 *                added_by: 1,
 *                is_active: true,
 *                is_deleted: false,
 *                inactivedAt: null,
 *                deletedAt: null,
 *                createdAt: '2019-06-24T18:37:28.000Z',
 *                updatedAt: '2019-06-24T18:37:28.000Z',
 *                receipt: [Object]
 *            },
 *            {
 *                id: 'S-00000002',
 *                first_name: 'Văn Thanh',
 *                last_name: 'Nguyễn',
 *                gender: 'female',
 *                date_of_birth: '1993-12-20',
 *                identifier: '2315627893454',
 *                address: '201 Trần Não, Quận 2',
 *                city: 'TPHCM',
 *                country: 'Việt Nam',
 *                zip: '70000',
 *                photo_location: null,
 *                phone: '+8451469546546',
 *                email: 'vanthanh@digitechglobalco.com',
 *                userid: 8,
 *                added_by: 1,
 *                is_active: true,
 *                is_deleted: false,
 *                inactivedAt: null,
 *                deletedAt: null,
 *                createdAt: '2019-06-24T18:37:28.000Z',
 *                updatedAt: '2019-06-24T18:37:28.000Z',
 *                receipt: [Object] },
 *        ],
 *        failedList: []
 *}
 */
// #endregion

// #region [Registration] Update registration
/**
 * @api {put} /api/registration/:registrationId [Registration] Update registration
 * @apiDescription Update a registration in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} message (optional) Message of registration
 * @apiParam {String} course_id (optional) Course ID want to register.
 * @apiParam {student_ids} student_ids (optional) Update student ids to this registration of this course.
 * @apiParam {String} status (optional) Set status of registration.

 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/registration/1
 *
 * @apiSuccess (Success) {Object} data of updated reigstration
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *    status: 'New',
 *    is_active: true,
 *    is_deleted: false,
 *    id: 1,
 *    message: 'This is registration for customer: Digitech Global Co',
 *    course_fee: 200,
 *    total_students: 3,
 *    total_cost: '600',
 *    cost_currency: '$',
 *    course_id: 1,
 *    customer_id: 1,
 *    added_by: 1,
 *    updatedAt: '2019-06-24T18:37:29.892Z',
 *    createdAt: '2019-06-24T18:37:29.828Z',
 *    successList:
 *    [
 *            {   id: 'S-00000001',
 *                first_name: 'Văn Tưởng',
 *                last_name: 'Trần',
 *                gender: 'male',
 *                date_of_birth: '1993-12-20',
 *                identifier: '231567893454',
 *                address: '200 Trần Duật, Quận 1',
 *                city: 'TPHCM',
 *                country: 'Việt Nam',
 *                zip: '70000',
 *                photo_location: null,
 *                phone: '+845469546546',
 *                email: 'vantuong@digitechglobalco.com',
 *                userid: 7,
 *                added_by: 1,
 *                is_active: true,
 *                is_deleted: false,
 *                inactivedAt: null,
 *                deletedAt: null,
 *                createdAt: '2019-06-24T18:37:28.000Z',
 *                updatedAt: '2019-06-24T18:37:28.000Z',
 *                receipt: [Object]
 *            },
 *            {
 *                id: 'S-00000002',
 *                first_name: 'Văn Thanh',
 *                last_name: 'Nguyễn',
 *                gender: 'female',
 *                date_of_birth: '1993-12-20',
 *                identifier: '2315627893454',
 *                address: '201 Trần Não, Quận 2',
 *                city: 'TPHCM',
 *                country: 'Việt Nam',
 *                zip: '70000',
 *                photo_location: null,
 *                phone: '+8451469546546',
 *                email: 'vanthanh@digitechglobalco.com',
 *                userid: 8,
 *                added_by: 1,
 *                is_active: true,
 *                is_deleted: false,
 *                inactivedAt: null,
 *                deletedAt: null,
 *                createdAt: '2019-06-24T18:37:28.000Z',
 *                updatedAt: '2019-06-24T18:37:28.000Z',
 *                receipt: [Object] },
 *        ],
 *        failedList: []
 *}
 */
// #endregion

// #region [Registration] Delete registration
/**
 * @api {delete} /api/registration/:registrationId [Registration] Delete registration
 * @apiDescription Update a registration in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/registration/1
 *
 * @apiSuccess (Success) {Object} data of deleted reigstration
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *    status: 'Deleted',
 *    is_active: false,
 *    is_deleted: true,
 *    id: 1,
 *    message: 'This is registration for customer: Digitech Global Co',
 *    course_fee: 200,
 *    total_students: 3,
 *    total_cost: '600',
 *    cost_currency: '$',
 *    course_id: 1,
 *    customer_id: 1,
 *    added_by: 1,
 *    updatedAt: '2019-06-24T18:37:29.892Z',
 *    createdAt: '2019-06-24T18:37:29.828Z',
 *}
 */
// #endregion

// #region [Registration] Add student to registration
/**
 * @api {post} /api/registration/:registrationId/student [Registration] Add student to registration
 * @apiDescription Add students to registration in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Array} student_ids (require) List of students add to registration
 *
 * @apiSuccess (Success) {Object} data of deleted reigstration
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * HTTP/1.1 200 OK
 *{
 *    status: 'New',
 *    is_active: true,
 *    is_deleted: false,
 *    id: 1,
 *    message: 'This is registration for customer: Digitech Global Co',
 *    course_fee: 200,
 *    total_students: 3,
 *    total_cost: '600',
 *    cost_currency: '$',
 *    course_id: 1,
 *    customer_id: 1,
 *    added_by: 1,
 *    updatedAt: '2019-06-24T18:37:29.892Z',
 *    createdAt: '2019-06-24T18:37:29.828Z',
 *    successList:
 *    [
 *            {   id: 'S-00000001',
 *                first_name: 'Văn Tưởng',
 *                last_name: 'Trần',
 *                gender: 'male',
 *                date_of_birth: '1993-12-20',
 *                identifier: '231567893454',
 *                address: '200 Trần Duật, Quận 1',
 *                city: 'TPHCM',
 *                country: 'Việt Nam',
 *                zip: '70000',
 *                photo_location: null,
 *                phone: '+845469546546',
 *                email: 'vantuong@digitechglobalco.com',
 *                userid: 7,
 *                added_by: 1,
 *                is_active: true,
 *                is_deleted: false,
 *                inactivedAt: null,
 *                deletedAt: null,
 *                createdAt: '2019-06-24T18:37:28.000Z',
 *                updatedAt: '2019-06-24T18:37:28.000Z',
 *                receipt: [Object]
 *            },
 *            {
 *                id: 'S-00000002',
 *                first_name: 'Văn Thanh',
 *                last_name: 'Nguyễn',
 *                gender: 'female',
 *                date_of_birth: '1993-12-20',
 *                identifier: '2315627893454',
 *                address: '201 Trần Não, Quận 2',
 *                city: 'TPHCM',
 *                country: 'Việt Nam',
 *                zip: '70000',
 *                photo_location: null,
 *                phone: '+8451469546546',
 *                email: 'vanthanh@digitechglobalco.com',
 *                userid: 8,
 *                added_by: 1,
 *                is_active: true,
 *                is_deleted: false,
 *                inactivedAt: null,
 *                deletedAt: null,
 *                createdAt: '2019-06-24T18:37:28.000Z',
 *                updatedAt: '2019-06-24T18:37:28.000Z',
 *                receipt: [Object] },
 *        ],
 *        failedList: []
 *}
 */
// #endregion

// #region [Registration] Delete students from a registration
/**
 * @api {delete} /api/registration/:registrationId/student [Registration] Delete students to registration
 * @apiDescription Delete a registration in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Array} student_ids (require) List of students want to delete from registration
 *
 * @apiSuccess (Success) {Object} Data of reigstration update to up-to-date
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * HTTP/1.1 200 OK
 *{
 *    status: 'New',
 *    is_active: true,
 *    is_deleted: false,
 *    id: 1,
 *    message: 'This is registration for customer: Digitech Global Co',
 *    course_fee: 200,
 *    total_students: 3,
 *    total_cost: '600',
 *    cost_currency: '$',
 *    course_id: 1,
 *    customer_id: 1,
 *    added_by: 1,
 *    updatedAt: '2019-06-24T18:37:29.892Z',
 *    createdAt: '2019-06-24T18:37:29.828Z',
 *    successList: ['S-00000001', 'S-00000002'],
 *    failedList: []
 *}
 */
// #endregion

// #region [Registration] List student of registration
/**
 * @api {get} /api/registration/:registrationId/student [Registration] List student of registration
 * @apiDescription List all student of registration in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} id (optional) Id of student
 * @apiParam {String} name (optional) Search for both last name and fist name of student
 * @apiParam {String} gender (optional) Gender of student
 * @apiParam {Date} date_of_birth (optional) Birthday of student
 * @apiParam {String} identifier (optional) Identifer of student
 * @apiParam {String} address (optional) Address of student
 * @apiParam {String} city (optional) City of student
 * @apiParam {String} country (optional) Country of student
 * @apiParam {String} zip (optional) ZIP code of student
 * @apiParam {String} phone (optional) Phone number of student
 * @apiParam {String} email (optional) Email of student
 * @apiParam {String} position (optional) Position of student
 * @apiParam {String} nationality (optional) Nationality of student
 * @apiParam {Boolean} is_active (optional) Active status of student
 *
 * @apiParam {String} sort (optional) Sort by field. Default: first_name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/registration/REG-CSHARP_BASIC-00001/student
 *  http://localhost:3000/api/registration/REG-CSHARP_BASIC-00001/student?name=cap&gender=female&city=die
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
 *               "id":"S-00000005",
 *               "first_name":"Captain",
 *               "last_name":"Ameria",
 *               "gender":"female",
 *               "date_of_birth":"1993-09-15",
 *               "identifier":"2311256789854",
 *               "address":"999 End Game",
 *               "city":"San Diego",
 *               "country":"United States",
 *               "zip":"70000",
 *               "photo_location":null,
 *               "phone":"+8415469546456",
 *               "email":"captainameria@digitechglobalco.com",
 *               "position":null,
 *               "nationality":"Japanese",
 *               "userid":11,
 *               "added_by":1,
 *               "is_active":true,
 *               "is_deleted":false,
 *               "inactivedAt":null,
 *               "deletedAt":null,
 *               "createdAt":"2019-07-28T01:14:27.000Z",
 *               "updatedAt":"2019-07-28T01:14:27.000Z"
 *           },
 *           "customer_info":[
 *               {
 *                   "id":2,
 *                   "type":"COMPANY",
 *                   "name":"Avenger",
 *                   "address":"Hà Nội",
 *                   "phone":"0903211315",
 *                   "email":"business@avenger.com",
 *                   "extra_details":"Công ty TNHH Avenger US",
 *                   "contact_person":"Mr. Stark",
 *                   "short_name":"AVG",
 *                   "userid":3,
 *                   "identifier":null,
 *                   "zip_code":"AVGZIP",
 *                   "added_by":1,
 *                   "is_active":true,
 *                   "is_deleted":false,
 *                   "inactivedAt":null,
 *                   "deletedAt":null,
 *                   "createdAt":"2019-07-28T01:14:25.000Z",
 *                   "updatedAt":"2019-07-28T01:14:25.000Z",
 *                   "relationship":"EMPLOYER"
 *               }
 *           ]
 *       }
 *   ]
 * }
 */
// #endregion

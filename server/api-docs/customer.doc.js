// #region [Customer] List customer
/**
 * @api {get} /api/customer [Customer] List customer
 * @apiDescription List all customer in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} type (optional) filter by type: company/personal
 * @apiParam {String} name (optional) customer's name
 * @apiParam {String} address (optional) address of customer
 * @apiParam {String} phone (optional) phone number of customer
 * @apiParam {String} email (optional) email of customer
 * @apiParam {String} extra_details (optional) some extra details
 * @apiParam {String} contact_person (optional) contact person (if this is company customer)
 * @apiParam {String} short_name (optional) short name of customer
 * @apiParam {String} identifier (optional) identifier of customer
 * @apiParam {String} zip_code (optional) zip_code of customer
 * @apiParam {Boolean} is_active (optional) active status of customer
 *
 * @apiParam {String} sort (optional) Sort by field. Default: name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/customer
 * http://localhost:3000/api/customer?type=company&sort=name&direction=asc&page=1&offset=50&name=aven&address=Hà&email=busi
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
 *           "id":2,
 *           "type":"COMPANY",
 *           "name":"Avenger",
 *           "address":"Hà Nội",
 *           "phone":"0903211315",
 *           "email":"business@avenger.com",
 *           "extra_details":"Công ty TNHH Avenger US",
 *           "contact_person":"Mr. Stark",
 *           "short_name":"AVG",
 *           "userid":3,
 *           "identifier":null,
 *           "zip_code":"AVGZIP",
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-07-28T01:14:25.000Z",
 *           "updatedAt":"2019-07-28T01:14:25.000Z"
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Customer] Add customer
/**
 * @api {post} /api/customer [Customer] Add customer
 * @apiDescription Add new customer
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} type (required) user type: company or personal
 * @apiParam {String} name (required) name
 * @apiParam {String} address (optional) address
 * @apiParam {String} phone (required) phone number
 * @apiParam {String} email (required) email address
 * @apiParam {String} extra_details (optional) extra detail for customer
 * @apiParam {String} contact_person (optional) contact person
 * @apiParam {String} short_name (optional) short name of customer, type of customer is COMPANY short name is required else it optional
 * @apiParam {String} identifier (optional) identifider of personal customer, if customer is personal then identifier is required
 * @apiParam {String} zip_code (optional) zip code of company customer, if customer is company then zip code is required
 * @apiParam {String} is_active (optional) active or not? default: true
 * @apiParam {Object} login_info (required) login infomation. Pass this object to post data to create user credential
 * @apiParam {String} login_info.username (required) username
 * @apiParam {String} login_info.password (required) password
 *
 * @apiParamExample {json} Request-Example
 *  {
 *       "type": "COMPANY",
 *       "name": "HuyHuy Company",
 *       "address": "Thanh pho Ho Chi Minh",
 *       "phone": "0397097276",
 *       "email": "huyhuy@gmail.com",
 *       "extra_details": "I am Iron man",
 *       "short_name": "HUY",
 *       "zip_code": "HUYZIP",
 *       "is_active": "true",
 *       "contact_person": "Huy",
 *       "login_info": {
 *           "username": "huyhuy",
 *           "password": "12345678"
 *       }
 *   }
 *
 * @apiSuccess (Success) {Object} customer Created customer info
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "identifier":null,
 *   "is_deleted":false,
 *   "id":6,
 *   "type":"COMPANY",
 *   "name":"HuyHuy Company",
 *   "address":"Thanh pho Ho Chi Minh",
 *   "phone":"0397097276",
 *   "email":"huyhuy@gmail.com",
 *   "extra_details":"I am Iron man",
 *   "short_name":"HUY",
 *   "zip_code":"HUYZIP",
 *   "is_active":true,
 *   "contact_person":"Huy",
 *   "added_by":1,
 *   "userid":17,
 *   "updatedAt":"2019-07-28T01:22:20.638Z",
 *   "createdAt":"2019-07-28T01:22:20.638Z"
 * }
 */
// #endregion

// #region [Customer] Search customer
/**
 * @api {get} /api/customer/search [Customer] Search customer
 * @apiDescription Search customer by all fields
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} type (optional) customer type
 * @apiParam {String} name (optional) customer name
 * @apiParam {String} address (optional) customer address
 * @apiParam {String} phone (optional) customer phone
 * @apiParam {String} email (optional) customer email
 * @apiParam {String} extra_details (optional) customer extra_details
 * @apiParam {String} contact_person (optional) contact person
 * @apiParam {String} short_name (optional) short name of customer
 * @apiParam {String} identifier (optional) identifier of customer
 * @apiParam {String} zip_code (optional) zip code of customer
 * @apiParam {String} is_active (optional) customer is_active
 * @apiParam {String} sort (optional) Sort by field. Default: name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/customer/search?name=Conpany&email=testuser@gmail.com
 *
 * @apiSuccess (Success) {Object} customer object details paginated
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "totalRecord":1,
 *   "totalPage":1,
 *   "page":1,
 *   "data":[
 *       {
 *           "id":6,
 *           "type":"COMPANY",
 *           "name":"HuyHuy Company",
 *           "address":"Thanh pho Ho Chi Minh",
 *           "phone":"0397097276",
 *           "email":"huyhuy@gmail.com",
 *           "extra_details":"I am Iron man",
 *           "contact_person":"Huy",
 *           "short_name":"HUY",
 *           "userid":17,
 *           "identifier":null,
 *           "zip_code":"HUYZIP",
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-07-28T01:22:20.000Z",
 *           "updatedAt":"2019-07-28T01:22:20.000Z"
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Customer] Get customer
/**
 * @api {get} /api/customer/:customerId [Customer] Get customer
 * @apiDescription Get customer infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} customerId (required) customerId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/customer/5
 *
 * @apiSuccess (Success) {Object} customer object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id":5,
 *   "type":"PERSONAL",
 *   "name":"Dương Tấn Hùng",
 *   "address":"HCM",
 *   "phone":"3241654887",
 *   "email":"hungdt@digitechglobalco.com",
 *   "extra_details":null,
 *   "contact_person":null,
 *   "short_name":null,
 *   "userid":6,
 *   "identifier":"324435723894",
 *   "zip_code":null,
 *   "added_by":1,
 *   "is_active":true,
 *   "is_deleted":false,
 *   "inactivedAt":null,
 *   "deletedAt":null,
 *   "createdAt":"2019-07-28T01:14:26.000Z",
 *   "updatedAt":"2019-07-28T01:14:26.000Z"
 * }
 */
// #endregion

// #region [Customer] Update customer
/**
 * @api {put} /api/customer/:customerId [Customer] Update customer
 * @apiDescription Update customer infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} customerId (required) customerId passed as param
 * @apiParam {String} type (optional) user type: company or personal
 * @apiParam {String} name (optional) name
 * @apiParam {String} address (optional) address
 * @apiParam {String} phone (optional) phone number
 * @apiParam {String} email (optional) email address
 * @apiParam {String} extra_details (optional) extra detail for user
 * @apiParam {String} contact_person (optional) contact person
 * @apiParam {String} short_name (optional) short name of customer, type of customer is COMPANY short name is required else it optional
 * @apiParam {String} identifier (optional) identifier of customer
 * @apiParam {String} zip_code (optional) zip code of customer
 * @apiParam {String} is_active (optional) active or not
 * @apiParam {Object} login_info (optional) login infomation. Pass this object to post data to create user credential
 * @apiParam {String} login_info.username (required) username
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/customer/1
 *  {
 *   "type": "PERSONAL",
 *   "name": "HuyHuy Company",
 *   "address": "Thanh pho Ho Chi Minh",
 *   "phone": "0397097276",
 *   "email": "huyhuy@gmail.com",
 *   "extra_details": "I am Iron man",
 *   "is_active": "true",
 *   "contact_person": "Huy",
 *   "short_name": "HUYDEEPTRY",
 *   "login_info": {
 *       "username": "huydeeptry"
 *   }
 * }
 *
 * @apiSuccess (Success) {Object} customer Updated customer info
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id":6,
 *   "type":"COMPANY",
 *   "name":"HuyHuy Company",
 *   "address":"Thanh pho Ho Chi Minh",
 *   "phone":"0397097276",
 *   "email":"huyhuy@gmail.com",
 *   "extra_details":"I am Iron man",
 *   "contact_person":"Huy",
 *   "short_name":"HUYDEEPTRY",
 *   "userid":17,
 *   "identifier":null,
 *   "zip_code":"HUYZIP",
 *   "added_by":1,
 *   "is_active":true,
 *   "is_deleted":false,
 *   "inactivedAt":null,
 *   "deletedAt":null,
 *   "createdAt":"2019-07-28T01:22:20.000Z",
 *   "updatedAt":"2019-07-28T01:28:29.295Z"
 * }
 */
// #endregion

// #region [Customer] List student of customer
/**
 * @api {get} /api/customer/:customerId/student [Customer] List student of customer
 * @apiDescription List all student of customer in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} id (optional) Id of student
 * @apiParam {String} name (optional) For search both last name and first name
 * @apiParam {String} gender (optional) Gender of student
 * @apiParam {Date} date_of_birth (optional) Birthday of student
 * @apiParam {String} identifier (optional) Identifier of student, max 255
 * @apiParam {String} address (optional) Address of student
 * @apiParam {String} city (optional) City of student, max 255
 * @apiParam {String} country (optional) Country of student, max 255
 * @apiParam {String} zip (optional) ZIP code
 * @apiParam {String} phone (optional) Phone number of student, max 255
 * @apiParam {String} email (optional) Email of student, max 255
 * @apiParam {String} position (optional) Position of student, max 255
 * @apiParam {Boolean} is_active (optional) Status of student, true => active, false => not active
 *
 * @apiParam {String} sort (optional) Sort by field. Default: first_name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/customer/1/student
 *  http://localhost:3000/api/customer/1/student?name=tưởng&gender=male&date_of_birth=1993-12-20&identifier=231567&address=Duật&country=Việt n&zip=700&email=vantuong@&position=employee&is_active=true
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

// #region [Customer] Add student
/**
 * @api {post} /api/customer/:customerId/student [Customer] Add student
 * @apiDescription Add new student for customer
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {File} photo (optional) Image file (jpg|jpeg|png|gif)
 * @apiParam {String} first_name (required) first name
 * @apiParam {String} last_name (required) last name
 * @apiParam {String} gender (required) gender: male, female, other
 * @apiParam {Date} date_of_birth (required) date of birth
 * @apiParam {String} address (required) address
 * @apiParam {String} identifier (required) identify card number or passport number
 * @apiParam {String} city (required) city
 * @apiParam {String} country (required) country
 * @apiParam {String} zip (required) zip code
 * @apiParam {File} photo (optional) photo file
 * @apiParam {String} phone (required) phone number
 * @apiParam {String} email (required) email address
 * @apiParam {String} position (optional) position
 * @apiParam {String} customer_relationship (required) customer relationship: employer, parent, self
 * @apiParam {Object} login_info (required) login infomation. Pass this object to post data to create user credential. undefined to skip
 * @apiParam {String} login_info.username (required) username
 * @apiParam {String} login_info.password (required) password
 *
 * @apiSuccess (Success) {Object} student Created student info
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": 406,
 *      "first_name": "Company.FN103117",
 *      "last_name": "Company.LN103117",
 *      "gender": "nam",
 *      "date_of_birth": "2019-06-07",
 *      "identifier": "id103117",
 *      "address": "address103117",
 *      "city": "city103117",
 *      "country": "country103117",
 *      "zip": "zip103117",
 *      "photo_location": "uploads/mim_development/student/photo/1560794435597_28467789_1417615791680878_6675225849591469117_n.jpg",
 *      "phone": "phone103117",
 *      "email": "example103117@example.com",
 *      "position": "Lop truong",
 *      "nationality": "Vietnamese",
 *      "is_active": true,
 *      "is_deleted": false,
 *      "inactivedAt": null,
 *      "deletedAt": null,
 *      "userid": 411,
 *      "added_by": 1,
 *      "createdAt": "2019-06-07T15:29:43.000Z",
 *      "updatedAt": "2019-06-07T15:29:43.000Z"
 *  }
 */
// #endregion

// #region [Customer] Import student
/**
 * @api {post} /api/customer/:customerId/student/import [Customer] Import student
 * @apiDescription Import new student for customer
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} first_name (required) first name
 * @apiParam {String} last_name (required) last name
 * @apiParam {String} gender (required) gender: male, female, other
 * @apiParam {Date} date_of_birth (required) date of birth
 * @apiParam {String} address (required) address
 * @apiParam {String} identifier (required) identify card number or passport number
 * @apiParam {String} city (required) city
 * @apiParam {String} country (required) country
 * @apiParam {String} zip (required) zip code
 * @apiParam {File} photo (optional) photo file
 * @apiParam {String} phone (required) phone number
 * @apiParam {String} email (required) email address
 * @apiParam {String} position (optional) position
 * @apiParam {String} customer_relationship (required) customer relationship: employer, parent, self
 *
 * @apiParamExample {json} Request-Example
 *  [
 *      {
 *          "first_name": "Huu Hien",
 *          "last_name": "Le",
 *          "gender": "MALE",
 *          "date_of_birth": "1996-09-15",
 *          "address": "Quy Nhon",
 *          "identifier": "234541768",
 *          "city": "Quy nhon",
 *          "country": "vietnam",
 *          "zip": "01123121",
 *          "phone": "0321345178",
 *          "email": "huuhien@digitechgobalco.com",
 *          "position": "Developer",
 *          "nationality": "Vietnamese",
 *          "is_active": true,
 *          "customer_relationship": "EMPLOYER"
 *      }
 *  ]
 *
 * @apiSuccess (Success) {Object} failedList Failed import list student
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "failedList": [
 *          {
 *              "first_name": "Huu Hien",
 *              "last_name": "Le",
 *              "gender": "MALE",
 *              "date_of_birth": "1996-09-15",
 *              "address": "Quy Nhon",
 *              "identifier": "234541768",
 *              "city": "Quy nhon",
 *              "country": "vietnam",
 *              "zip": "01123121",
 *              "phone": "0321345178",
 *              "email": "huuhien@digitechgobalco.com",
 *              "position": "Developer",
 *              "nationality": "Vietnamese",
 *              "is_active": true,
 *              "customer_relationship": "EMPLOYER",
 *              "errors": [
 *                  {
 *                      "field": "identifier",
 *                      "value": "234541768",
 *                      "message": "identifier is already existed"
 *                  },
 *                  {
 *                      "field": "phone",
 *                      "value": "0321345178",
 *                      "message": "phone is already existed"
 *                  },
 *                  {
 *                      "field": "email",
 *                      "value": "huuhien@digitechgobalco.com",
 *                      "message": "email is already existed"
 *                  }
 *              ]
 *          }
 *      ]
 *  }
 */
// #endregion

// #region [Customer] List registration of customer
/**
 * @api {get} /api/customer/:customerId/registration [Customer] List registration of customer
 * @apiDescription List all registration of customer in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} message (optional) Message of registration
 * @apiParam {String} status (optional) Status of registration
 * @apiParam {Number} total_students (optional) Total students of registration
 * @apiParam {Number} total_cost (optional) Total cost of registration
 * @apiParam {String} cost_currency (optional) Cost currency of registration
 * @apiParam {String} course_id (optional) Course id
 *
 * @apiParam {String} sort (optional) Sort by field. Default: id
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/customer/1/registration
 *  http://localhost:3000/api/customer/1/registration?message=for cus&status=new&&total_students=2&total_cost=400&cost_currency=$
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
 *           "id":"REG-JAVASCRIPT_BASIC-00002",
 *           "message":"Registration #5 for customer: Digitech Global Co",
 *           "status":"New",
 *           "course_fee":200,
 *           "total_students":2,
 *           "total_cost":400,
 *           "cost_currency":"$",
 *           "course_id":"3",
 *           "customer_id":1,
 *           "added_by":1,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-07-10T07:38:19.000Z",
 *           "updatedAt":"2019-07-10T07:38:19.000Z",
 *           "Course":{
 *               "id":3,
 *               "code":"JAVASCRIPT_BASIC",
 *               "name":"JavaScript Fundamentals",
 *               "excerpt": null,
 *               "detail":"JavaScript for beginner",
 *               "total_sessions":20,
 *               "session_duration":2,
 *               "session_duration_in":"hour",
 *               "price":200,
 *               "type_cost": 1,
 *               "fee_currency":"$",
 *               "institute_id":1,
 *               "course_category_id":3,
 *               "avatar_location":null,
 *               "trailer_location":null,
 *               "photo_location":null,
 *               "added_by":1,
 *               "is_active":true,
 *               "is_deleted":false,
 *               "inactivedAt":null,
 *               "deletedAt":null,
 *               "createdAt":"2019-07-10T07:38:17.000Z",
 *               "updatedAt":"2019-07-10T07:38:17.000Z"
 *           }
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Customer] List classes of customer
/**
 * @api {get} /api/customer/:customerId/class [Customer] List class of customer
 * @apiDescription List all class of customer in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} id (optional) Id of class
 * @apiParam {String} status (optional) Class status, valid in (Completed, Canceled, Processing and New)
 * @apiParam {String} course_id (optional) Course id
 * @apiParam {String} name (optional) Name of class
 * @apiParam {Number} capacity (optional) Capacity of class
 * @apiParam {Boolean} teacher_assigned (optional) Is this class was assigned teacher or not (true / false)
 * @apiParam {Boolean} is_active (optional) Active status of class
 * @apiParam {String} sort (optional) Sort by field. Default: name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 50. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/class?sort=name&direction=asc&page=1&offset=50
 *  http://localhost:3000/api/class?course_id=1&status=Completed&is_active=true&name=java&capacity=50
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Array} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "totalRecord":1,
 *   "totalPage":1,
 *   "page":1,
 *   "data":[
 *       {
 *           "id":"CLS-RUBY_BASIC-00001",
 *           "name":"Ruby with Huy",
 *           "status":"Completed",
 *           "session_studied": 0,
 *           "total_students":4,
 *           "total_teachers":2,
 *           "capacity":50,
 *           "start_date":"2019-08-09",
 *           "end_date":"2019-09-13",
 *           "course_id":8,
 *           "center_id":1,
 *           "teacher_assigned":true,
 *           "certification_organization":null,
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-08-08T09:59:45.000Z",
 *           "updatedAt":"2019-08-08T10:00:47.000Z",
 *           "Center":{
 *               "id":1,
 *               "name":"Main center",
 *               "address":"Address of main center",
 *               "phone":"0918447844",
 *               "email":"main@center.com",
 *               "extra_details":"Testing main center extra details",
 *               "website":null,
 *               "institute_id":1
 *           },
 *           "Course":{
 *               "id":8,
 *               "code":"RUBY_BASIC",
 *               "name":"Ruby Fundamentals",
 *               "detail":"Ruby for beginner",
 *               "total_sessions":20,
 *               "session_duration":2,
 *               "session_duration_in":"hour",
 *               "price":200,
 *               "type_cost":0,
 *               "fee_currency":"$",
 *               "institute_id":1,
 *               "course_category_id":8,
 *               "photo_location":null
 *           }
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Customer] register new customer
/**
 * @api {get} /api/customer/register [Customer] Register new customer
 * @apiDescription Register new customer
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiParam {String} email (required) Email contact
 * @apiParam {String} password (required) Password want to login
 * @apiParam {String} phone (required) Phone number
 * @apiParam {String} name (required) Name of customer, canbe company name or personal name
 * @apiParam {Number} type (required) Type of customer, COMPANY or PERSONAL
 *
 * @apiParamExample {json} Request-Example
 * http://localhost:3000/api//api/customer/register
 *
 * @apiSuccess (Success) {Object} user User object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *      "id": 2,
 *      "username": "huyquyen",
 *      "password": "$2b$10$Gn3su7WXeqZbhwrvfo2QvOaP4NnxlCamoJp6I15sLiXniyUvR/WuC",
 *      "email": "huyquyent@gmail.com",
 *      "user_type_id": "STAFF",
 *      "role_id": "OPERATOR",
 *      "added_by": 1,
 *      "is_active": true,
 *      "is_deleted": false,
 *      "inactivedAt": null,
 *      "deletedAt": null,
 *      "createdAt": "2019-06-29T06:53:36.000Z",
 *      "updatedAt": "2019-06-29T06:53:36.000Z"
 * }
 */
// #endregion

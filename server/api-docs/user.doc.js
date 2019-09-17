// #region [User] List role
/**
 * @api {get} /api/user/role [User] List role
 * @apiDescription List all user role in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} sort (optional) Sort by field. Default: id
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 * @apiParam {String} description (optional) Description of role
 * @apiParam {Boolean} is_active (optional) active status of role
 * @apiParam {String} id (optional) Id of role
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/role
 *  http://localhost:3000/api/user/role?id=mer&sort=description&direction=asc&page=1&offset=50&is_active=true
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "totalRecord": 1,
 *  "totalPage": 1,
 *  "page": 1,
 *  "data": [
 *    {
 *      "id": "CUSTOMER",
 *      "description": "Customer role",
 *      "added_by": 1,
 *      "is_active": true,
 *      "is_deleted": false,
 *      "inactivedAt": null,
 *      "deletedAt": null,
 *      "createdAt": "2019-07-10T07:37:52.000Z",
 *      "updatedAt": "2019-07-10T07:37:52.000Z"
 *    }
 *  ]
 * }
 */
// #endregion

// #region [User] Add role
/**
 * @api {post} /api/user/role [User] Add role
 * @apiDescription Add new role
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} id (required) Role id, allow string max length 20, uppercase
 * @apiParam {String} description (optional) Role description
 * @apiParam {Boolean} is_active (optional) Set role is active or not. Default: true
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "id": "superadmin",
 *      "description": "this is description",
 *      "is_active": true
 *  }
 *
 * @apiSuccess (Success) {Object} Role object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "is_deleted": false,
 *   "id": "SUPERADMIN",
 *   "description": "this is description",
 *   "is_active": true,
 *   "added_by": 1,
 *   "updatedAt": "2019-07-03T09:49:48.629Z",
 *   "createdAt": "2019-07-03T09:49:48.629Z"
 * }
 */
// #endregion

// #region [User] Get role
/**
 * @api {get} /api/user/role/:roleId [User] Get role
 * @apiDescription Get role infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} roleId (required) roleId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/role/superadmin
 *
 * @apiSuccess (Success) {Object} Role object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "is_deleted": false,
 *   "id": "SUPERADMIN",
 *   "description": "this is description",
 *   "is_active": true,
 *   "added_by": 1,
 *   "updatedAt": "2019-07-03T09:49:48.629Z",
 *   "createdAt": "2019-07-03T09:49:48.629Z"
 * }
 */
// #endregion

// #region [User] Update role
/**
 * @api {put} /api/user/role/:roleId [User] Update role
 * @apiDescription Update role infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} roleId (required) roleId passed as param
 *
 * @apiParam {String} description (optional) description of role, datatype: text
 * @apiParam {Boolean} is_active (optional) is_active of role, (true or false)
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/role/superadmin
 *  {
 *      "decription": "new description for this field",
 *      "is_active": false
 *  }
 *
 * @apiSuccess (Success) {Object} Role object updated details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "SUPERADMIN",
 *   "description": "new description for this field",
 *   "added_by": 1,
 *   "is_active": false,
 *   "is_deleted": false,
 *   "inactivedAt": "2019-07-03T10:20:04.829Z",
 *   "deletedAt": null,
 *   "createdAt": "2019-07-03T09:49:48.000Z",
 *   "updatedAt": "2019-07-03T10:20:04.828Z"
 * }
 */
// #endregion

// #region [User] Delete role
/**
 * @api {delete} /api/user/role/:roleId [User] Delete role
 * @apiDescription Update role infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} roleId (required) roleId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/role/5
 *
 * @apiSuccess (Success) {Object} role Deleted role object
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": 5,
 *      "code": "manager",
 *      "is_active": false,
 *      "is_delete": true,
 *      "added_by": 1,
 *      "updatedAt": "2019-06-10T16:30:45.881Z",
 *      "createdAt": "2019-06-10T16:30:45.881Z",
 *      "deleteAt": "2019-06-10T16:30:45.881Z"
 *  }
 */
// #endregion

// #region [User] Get userType
/**
 * @api {get} /api/user/userType/:userTypeId [User] Get userType
 * @apiDescription Get user type infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} userTypeId (required) userTypeId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/userType/ADMIN
 *
 * @apiSuccess (Success) {Object} userType object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": "ADMIN",
 *      "description": "admin",
 *      "added_by": 1,
 *      "is_active: true,
 *      "is_deleted: false,
 *      "inactivedAt: null,
 *      "deletedAt: null,
 *      "updatedAt": "2019-06-10T16:30:45.881Z",
 *      "createdAt": "2019-06-10T16:30:45.881Z"
 *  }
 */
// #endregion

// #region [User] Add userType
/**
 * @api {post} /api/user/userType [User] Add userType
 * @apiDescription Add new userType
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} id (required) userType
 * @apiParam {String} description (optional)
 * @apiParam {Boolean} is_active (optional) Set role is active or not. Default: true
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "id": "manager",
 *      "description" : "Quan ly",
 *      "is_active": true
 *  }
 *
 * @apiSuccess (Success) {Object}  userType object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": "MANAGER",
 *      "description" : "Quan ly",
 *      "is_active": true,
 *      "added_by": 1,
 *      "updatedAt": "2019-06-10T16:30:45.881Z",
 *      "createdAt": "2019-06-10T16:30:45.881Z"
 *  }
 */
// #endregion

// #region [User] Update userType
/**
 * @api {put} /api/user/userType/:userTypeId [User] Update userType
 * @apiDescription Update userType infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiParam {String} userTypeId (required) userTypeId passed as param
 * @apiParam {String} description (optional) description
 * @apiParam {Boolean} is_active (optional) is active of userType
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/userType/admin
 * {
 *      "description": "desription updated",
 *      "is_active": false
 *  }
 *
 * @apiSuccess (Success) {Object} userType object updated details
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": "ADMIN",
 *      "description": "desription updated",
 *      "added_by": 1,
 *      "is_active": false,
 *      "is_deleted": false,
 *      "inactivedAt": "2019-07-03T10:21:10.196Z",
 *      "deletedAt": null,
 *      "createdAt": "2019-07-03T09:48:20.000Z",
 *      "updatedAt": "2019-07-03T10:19:55.000Z"
}
 */
// #endregion

// #region [User] List user type
/**
 * @api {get} /api/user/userType [User] List user type
 * @apiDescription List all user type in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} sort (optional) Sort by field. Default: code
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 50. Default: 10
 * @apiParam {String} description (optional) Description of user type
 * @apiParam {Boolean} is_active (optional) Active status of user type
 * @apiParam {String} id (optional) Id of user type
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/userType
 *  http://localhost:3000/api/user/userType?sort=code&direction=asc&page=1&offset=50&id=t&is_active=true
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *
 *  {
 *   "totalRecord": 2,
 *   "totalPage": 1,
 *   "page": 1,
 *   "data": [
 *     {
 *       "id": "STAFF",
 *       "description": null,
 *       "added_by": 1,
 *       "is_active": true,
 *       "is_deleted": false,
 *       "inactivedAt": null,
 *       "deletedAt": null,
 *       "createdAt": "2019-07-10T07:37:52.000Z",
 *       "updatedAt": "2019-07-10T07:37:52.000Z"
 *     },
 *     {
 *       "id": "STUDENT",
 *       "description": null,
 *       "added_by": 1,
 *       "is_active": true,
 *       "is_deleted": false,
 *       "inactivedAt": null,
 *       "deletedAt": null,
 *       "createdAt": "2019-07-10T07:37:52.000Z",
 *       "updatedAt": "2019-07-10T07:37:52.000Z"
 *     }
 *   ]
 *  }
 */
// #endregion

// #region [User] Get user
/**
 * @api {get} /api/user/:userId [User] Get user
 * @apiDescription Get user infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} userId (required) userId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/2
 *
 * @apiSuccess (Success) {Object} User object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *    "id": 2,
 *    "username": "tortoise10h",
 *    "password": "123456",
 *    "email": "tortoise10h@gmail.com",
 *    "user_type_id": 1,
 *    "role_id": 1,
 *    "added_by": 1,
 *    "is_active": true,
 *    "is_deleted": false,
 *    "inactivedAt": null,
 *    "deletedAt": null,
 *    "createdAt": "2019-12-12T12:12:12.000Z",
 *    "updatedAt": "2019-12-12T12:12:12.000Z"
 *  }
 */
// #endregion

// #region [User] List user
/**
 * @api {get} /api/user/ [User] List user
 * @apiDescription List all user in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} sort (optional) Sort by field. Default: username
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 50. Default: 10
 * @apiParam {Boolean} is_active (optional) filter is active
 * @apiParam {String} user_type_id (optional) filter is user type id
 * @apiParam {String} role_id (optional) filter role id
 *
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/
 *  http://localhost:3000/api/user?sort=username&direction=asc&page=1&offset=50?user_type_id=ADMIN
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "totalRecord": 2,
 *    "totalPage": 1,
 *    "page": 1,
 *    "data": [
 *        {
 *            "id": 1,
 *            "username": "admin",
 *            "password": "$2b$10$Lvb42OXx.vKwYkuO0n6dzeVOL/atuiQgpMp0fHBunRZxLSaRo.Ni.",
 *            "email": "admin@digitechglobalco.com",
 *            "user_type_id": ADMIN,
 *            "role_id": ADMIN,
 *            "added_by": 1,
 *            "is_active": true,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-06-29T06:42:13.000Z",
 *            "updatedAt": "2019-06-29T06:42:13.000Z"
 *        },
 *        {
 *            "id": 2,
 *            "username": "huyquyen",
 *            "password": "$2b$10$Gn3su7WXeqZbhwrvfo2QvOaP4NnxlCamoJp6I15sLiXniyUvR/WuC",
 *            "email": "huyquyent@gmail.com",
 *            "user_type_id": ADMIN,
 *            "role_id": ADMIN,
 *            "added_by": 1,
 *            "is_active": true,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-06-29T06:53:36.000Z",
 *            "updatedAt": "2019-06-29T06:53:36.000Z"
 *        }
 *    ]
 * }
 */
// #endregion

// #region [User] Add user
/**
 * @api {post} /api/user [User] Add user
 * @apiDescription Add new user
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} username (required) username
 * @apiParam {String} password (required) password
 * @apiParam {String} email (required) email
 * @apiParam {Boolean} is_active (optional) Set user is active or not. Default: true
 * @apiParam {String} user_type_id (required) user type id
 * @apiParam {String} role_id (required) role id
 *
 * @apiParamExample {json} Request-Example
 * {
 *     "username": "huyquyen",
 *     "password": "quyen123",
 *     "email": "huyquyent@gmail.com",
 *     "user_type_id": "STAFF",
 *     "role_id": "OPERATOR",
 *     "is_active": true,
 * },
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

// #region [User] Update user
/**
 * @api {put} /api/user/:userId [User] Update user
 * @apiDescription Update user infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiParam {String} userId (required) userId passed as param
 * @apiParam {String} username (optional) username of user, max 255
 * @apiParam {String} password (optional) password of user, max 255
 * @apiParam {String} email (optional) email of user, min domain segment 2, max length 255
 * @apiParam {String} role_id (optional) role of user, max 20, only alpha num, uppercase, invalid in (ADMIN, CUSTOMER)
 * @apiParam {String} user_type_id (optional) type of user, max 20, only alpha num, uppercase, invalid in (ADMIN, COMPANY, STUDENT)
 * @apiParam {Boolean} is_active (optional) set false to deactive
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/user/4
 * {
 *   "username": "johnjohndoe",
 *   "password": "123456",
 *   "email": "johnjohndoe@gmail.com",
 *   "user_type_id": "STAFF",
 *   "role_id": "TEACHER",
 *   "is_active": true,
 * }
 *
 * @apiSuccess (Success) {Object} user object updated details
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id": 4,
 *   "username": "johnjohndoe",
 *   "password": "$2b$10$2Tdo.Ju6i5rOW5MvOT7LRug5/KlAAsVUhvMS8Z..wtWgqGqD.Uu02",
 *   "email": "johnjohndoe@gmail.com",
 *   "user_type_id": "STAFF",
 *   "role_id": "TEACHER",
 *   "added_by": 1,
 *   "is_active": true,
 *   "is_deleted": false,
 *   "inactivedAt": null,
 *   "deletedAt": null,
 *   "createdAt": "2019-07-06T16:50:04.000Z",
 *   "updatedAt": "2019-07-08T09:23:12.605Z"
 * }
 */
// #endregion

// #region [Course] Update course category
/**
 * @api {put} /api/course/category/:categoryId [Course] Update category
 * @apiDescription Update course category information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} categoryId (required) categoryId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/course/category/2
 *  {
 *      "name": "Special Java",
 *      "detail": "Java category"
 *      "is_active": true
 *  }
 *
 * @apiSuccess (Success) {Object} category object updated details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": 2,
 *      "name": "Special Java",
 *      "detail": "Java category",
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

// #region [Course] List course category
/**
 * @api {get} /api/course/category [Course] List category
 * @apiDescription List all category in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} sort (optional) Sort by field. Default: name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 50. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/course/category
 *  http://localhost:3000/api/course/category?sort=name&direction=asc&page=1&offset=50
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "totalRecord": 754,
 *      "totalPage": 377,
 *      "page": 1,
 *      "data": [
 *          {
 *              "id": 2,
 *              "name": "Special Java",
 *              "detail": "Java category",
 *              "added_by": 1,
 *              "is_active": true,
 *              "is_deleted": false,
 *              "inactivedAt": null,
 *              "deletedAt": null,
 *              "createdAt": "2019-06-25T16:23:28.000Z",
 *              "updatedAt": "2019-06-25T16:34:49.341Z"
 *          },
 *          {
 *              "id": 2,
 *              "name": "Special Java",
 *              "detail": "Java category",
 *              "added_by": 1,
 *              "is_active": true,
 *              "is_deleted": false,
 *              "inactivedAt": null,
 *              "deletedAt": null,
 *              "createdAt": "2019-06-25T16:23:28.000Z",
 *              "updatedAt": "2019-06-25T16:34:49.341Z"
 *          }
 *      ]
 *  }
 */
// #endregion

// #region [Course] Add course category
/**
 * @api {post} /api/course/category [Course] Add category
 * @apiDescription Add course category
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} name (required) name
 * @apiParam {String} detail (optional) detail
 * @apiParam {String} is_active (optional) active or not? default: true *
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "name": "Special Java",
 *      "detail": "Java category",
 *      "is_active": true
 *  }
 *
 * @apiSuccess (Success) {Object} category object added details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": 2,
 *      "name": "Special Java",
 *      "detail": "Java category",
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

// #region [Course] Get course category
/**
 * @api {get} /api/course/category/:categoryId [Course] Get course category
 * @apiDescription Get course category infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} categoryId (required) categoryId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/course/category/5
 *
 * @apiSuccess (Success) {Object} course category object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": 2,
 *      "name": "Special Java",
 *      "detail": "Java category",
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

// #region [Course] Search course category
/**
 * @api {get} /api/course/category/:categoryId [Course] Search course category
 * @apiDescription Search course category infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3100/api/course/category/searchv2?search=name:Jav;CourseOfCourseCategory.code:JAVASCRIPT&searchFields=name:like;CourseOfCourseCategory.code:like&includes=CourseOfCourseCategory&searchJoin=and&page=1&offset=100
 *
 * @apiSuccess (Success) {Object} course category object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "totalRecord": 1,
 *      "totalPage": 1,
 *      "page": 1,
 *      "data": [
 *          {
 *              "id": 3,
 *              "name": "JavaScript",
 *              "detail": "JavaScript language",
 *              "added_by": 1,
 *              "is_active": true,
 *              "is_deleted": false,
 *              "inactivedAt": null,
 *              "deletedAt": null,
 *              "createdAt": "2019-07-09T17:49:25.000Z",
 *              "updatedAt": "2019-07-09T17:49:25.000Z",
 *              "CourseOfCourseCategory": [
 *                  {
 *                      "id": 3,
 *                      "code": "JAVASCRIPT_BASIC",
 *                      "name": "JavaScript Fundamentals",
 *                      "detail": "JavaScript for beginner",
 *                      "total_sessions": 20,
 *                      "session_duration": 2,
 *                      "session_duration_in": "hour",
 *                      "price": 200,
 *                      "type_cost": 0,
 *                      "fee_currency": "$",
 *                      "institute_id": 1,
 *                      "course_category_id": 3,
 *                      "added_by": 1,
 *                      "is_active": true,
 *                      "is_deleted": false,
 *                      "inactivedAt": null,
 *                      "deletedAt": null,
 *                      "createdAt": "2019-07-09T17:49:26.000Z",
 *                      "updatedAt": "2019-07-09T17:49:26.000Z"
 *                  }
 *              ]
 *          }
 *      ]
 *  }
 */
// #endregion

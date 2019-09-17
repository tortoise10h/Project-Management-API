// #region [Center] List center
/**
 * @api {get} /api/center [Center] List center
 * @apiDescription List all center in system
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
 * @apiParam {String} name (optional) Name of center max size 255
 * @apiParam {String} address (optional) Address of center
 * @apiParam {String} phone (optional) Phone number of center
 * @apiParam {String} email (optional) Email of center, min domain segment 2
 * @apiParam {String} extra_details (optional) Extra details of center
 * @apiParam {String} website (optional) website of center
 * @apiParam {Boolean} is_active (optional) set active false to deactive
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/center
 *  http://localhost:3000/api/center?sort=name&page=1&offset=50&direction=DESC&name=cen&address=main center&is_active=true&extra_details=testing
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *    "totalRecord": 1,
 *    "totalPage": 1,
 *    "page": 1,
 *    "data": [
 *        {
 *            "id": 1,
 *            "name": "Main center",
 *            "address": "Address of main center",
 *            "phone": "0234567891231",
 *            "email": "main@center.com",
 *            "extra_details": "Testing main center extra details",
 *            "website": null,
 *            "institute_id": 1,
 *            "added_by": 1,
 *            "is_active": true,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-07-05T01:46:14.000Z",
 *            "updatedAt": "2019-07-05T01:46:14.000Z"
 *        }
 *    ]
 *  }
 */
// #endregion

// #region [Center] Add center
/**
 * @api {post} /api/center [Center] Add center
 * @apiDescription Add center
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} name (required) name
 * @apiParam {String} address (optional) address
 * @apiParam {String} phone (required) phone
 * @apiParam {String} email (required) email
 * @apiParam {String} extra_detail (optional) extra_detail
 * @apiParam {String} website (optional) website of center
 * @apiParam {String} is_active (optional) active or not? default: true
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "name": "CenterB",
 *      "phone": "123456789",
 *      "address": "HCM",
 *      "email": "centerb@gmail.com",
 *      "extra_details": "abcdefc",
 *      "website": "https://www.google.com/",
 *      "is_active": true
 *  }
 *
 * @apiSuccess (Success) {Object} Center object added details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": 3,
 *      "name": "CenterB",
 *      "phone": "123456789",
 *      "email": "centerb@gmail.com",
 *      "address": "HCM",
 *      "extra_details": "abcdefc",
 *      "website": "https://www.google.com/",
 *      "institute_id": 1,
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

// #region [Center] Get center
/**
 * @api {get} /api/center/:centerId [Center] Get center
 * @apiDescription Get center infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} centerId (required) centerId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/center/5
 *
 * @apiSuccess (Success) {Object} Center object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": 3,
 *      "name": "CenterB",
 *      "phone": "123456789",
 *      "email": "centerb@gmail.com",
 *      "address": "HCM",
 *      "extra_details": "abcdefc",
 *      "institute_id": 1,
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

// #region [Center] Update center
/**
 * @api {put} /api/center/:centerId [Center] Update center
 * @apiDescription Update center infomation
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} centerId (required) centerId passed as param
 * @apiParam {String} name (optional) name
 * @apiParam {String} address (optional) address
 * @apiParam {String} phone (optional) phone number
 * @apiParam {String} email (optional) email address
 * @apiParam {String} extra_details (optional) extra detail for user
 * @apiParam {String} website (optional) website of center
 * @apiParam {String} is_active (optional) active or not
 *
 * @apiParamExample {json} Request-Example
 * http://localhost:3000/api/center/3
 *  {
 *    "name": "Avenger OhOh",
 *    "address": "New York city",
 *    "phone": "999888777",
 *    "email": "avengerhoho@gmail.com",
 *    "website": "http://www.avenger.hoho.com",
 *    "is_active": false,
 *  }
 *
 * @apiSuccess (Success) {Object} updated center info
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *    "id": 3,
 *    "name": "Avenger OhOh",
 *    "address": "New York city",
 *    "phone": "999888777",
 *    "email": "avengerhoho@gmail.com",
 *    "extra_details": "The place which can make you become a super heroes",
 *    "website": "http://www.avenger.hoho.com",
 *    "institute_id": 1,
 *    "added_by": 1,
 *    "is_active": false,
 *    "is_deleted": false,
 *    "inactivedAt": null,
 *    "deletedAt": null,
 *    "createdAt": "2019-07-05T02:31:36.000Z",
 *    "updatedAt": "2019-07-05T02:35:52.329Z"
 *  }
 */
// #endregion

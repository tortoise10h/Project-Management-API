// #region [Institute] List institute
/**
 * @api {get} /api/institute [Institute] List institute
 * @apiDescription List all institute in system
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
 * @apiParam {String} name (optional) Name of institute center max size 255
 * @apiParam {String} address (optional) Address of institute
 * @apiParam {String} phone (optional) Phone number of institute
 * @apiParam {String} email (optional) Email of institute, min domain segment 2
 * @apiParam {String} extra_details (optional) Extra details of institute
 * @apiParam {String} website (optional) website of institute
 * @apiParam {Boolean} is_active (optional) set active false to deactive
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/institute
 *  http://localhost:3000/api/institute?sort=email&direction=asc&name=mar&extra_details=studio
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
 *            "name": "Marvel Institute",
 *            "address": "Everywhere on earth",
 *            "phone": "01234567777",
 *            "email": "marveinstitute@gmail.com",
 *            "extra_details": "marvel studio",
 *            "website": "http://www.marvel.studio.com",
 *            "added_by": 1,
 *            "is_active": true,
 *            "is_deleted": false,
 *            "inactivedAt": null,
 *            "deletedAt": null,
 *            "createdAt": "2019-07-05T04:38:42.000Z",
 *            "updatedAt": "2019-07-05T06:53:39.000Z"
 *        }
 *    ]
 *  }
 */
// #endregion


// #region [Institute] Update institute
/**
 * @api {put} /api/institute/:instituteId [Institute] Update institute
 * @apiDescription Update institute information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} instituteId (required) instituteId passed as param
 * @apiParam {String} name (optional) Name of institute max size 255
 * @apiParam {String} address (optional) Address of institute
 * @apiParam {String} email (optional) Email of institute, max 255 min domain segment 2
 * @apiParam {String} phone (optional) Phone number of institute
 * @apiParam {String} extra_details (optional) Extra details
 * @apiParam {String} website (optional) Website of institute
 * @apiParam {Boolean} is_active (optional) set false to deactive institute
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/institute/1
 *  {
 *   "name": "Marvel Institute",
 *   "address": "Everywhere on earth",
 *   "phone": "01234567777",
 *   "email": "marveinstitute@gmail.com",
 *   "extra_details": "marvel studio",
 *   "website": "http://www.marvel.studio.com",
 *   "is_active": true,
 *  }
 *
 * @apiSuccess (Success) {Object} institute object updated details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id": 1,
 *   "name": "Marvel Institute",
 *   "address": "Everywhere on earth",
 *   "phone": "01234567777",
 *   "email": "marveinstitute@gmail.com",
 *   "extra_details": "marvel studio",
 *   "website": "http://www.marvel.studio.com",
 *   "added_by": 1,
 *   "is_active": true,
 *   "is_deleted": false,
 *   "inactivedAt": null,
 *   "deletedAt": null,
 *   "createdAt": "2019-07-05T04:38:42.000Z",
 *   "updatedAt": "2019-07-05T06:53:39.969Z"
 * }
 */
// #endregion

// #region [Institute] Add institute
/**
 * @api {post} /api/institute/ [Institute] Add institute
 * @apiDescription Create a new institute
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} name (required) Name of institute max size 255
 * @apiParam {String} address (optional) Address of institute
 * @apiParam {String} phone (required) Phone number of institute max size 255
 * @apiParam {String} extra_details (optional) Extra detail of institute
 * @apiParam {String} email (required) email of institute, min domain segment 2
 * @apiParam {String} website (optional) website of institute
 * @apiParam {Boolean} is_active (optional) active status of institute, default true
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/institute/
 *  {
 *      "name": "name name name",
 *      "address": "some where"
 *      "phone": "0123456789"
 *      "email": "huy12345@gmail.com"
 *      "extra_details": "extra detail"
 *      "website": "https://www.google.com/"
 *      "is_active": true
 *  }
 *
 * @apiSuccess (Success) {Object} institute object updated details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "is_deleted": false,
 *   "id": 2,
 *   "name": "New institute",
 *   "address": "some where on earth",
 *   "phone": "0123456789",
 *   "email": "newinstitute@gmail.com",
 *   "extra_details": "well well well",
 *   "website": "https://www.google.com/",
 *   "is_active": true,
 *   "added_by": 1,
 *   "updatedAt": "2019-07-05T04:07:10.233Z",
 *   "createdAt": "2019-07-05T04:07:10.233Z"
 * }
 */
// #endregion

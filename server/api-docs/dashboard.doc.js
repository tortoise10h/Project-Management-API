// #region [Dashboard] General Info
/**
 * @api {get} /api/dashboard/general-info [Dashboard] General Info
 * @apiDescription Get general info of education
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiParam {String} institute_ids (optional) Array of institute ids want to look up, splitted by comma. Ex: 1,2,3
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/dashboard/general-info
 *  http://localhost:3000/api/dashboard/general-info?institute_ids=1
 *
 * @apiSuccess (Success) {Number} totalCourse Total course within list institute
 * @apiSuccess (Success) {Number} totalStudent Total student in edu system
 * @apiSuccess (Success) {Number} totalCenter Total center within list institute
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *    "totalCourse": 9,
 *    "totalStudent": 7,
 *    "totalCenter": 2
 *  }
 */
// #endregion

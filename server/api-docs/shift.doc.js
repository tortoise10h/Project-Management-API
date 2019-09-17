// #region [StudyShift] List study shift
/**
 * @api {get} /api/shift [StudyShift] List study shift
 * @apiDescription Get list study shift
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

// #region [StudyShift] Add study shift
/**
 * @api {post} /api/center/:centerId/shift [StudyShift] Add study shift
 * @apiDescription Add new study shift
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Numver} centerId (required) centerId passed as param
 *
 * @apiParam {Array[Object]} array of new study shift (required) :
 *   {String} start_time (required) start time of shift, have to follow 'hh:mm' format
 * | {String} end_time (required) end time of shift, have to follow 'hh:mm' format
 * | {Number} day_of_week (required) day of week of study shift
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/center/1/shift
 *  [
 *   {
 *       "start_time": "8:30",
 *       "end_time": "18:00",
 *       "day_of_week": 0
 *   }
 * ]
 *
 * @apiSuccess (Success) {Object} new list of study shift created
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "success_message":"Create study shift successfully"
 * }
 */
// #endregion

// #region [StudyShift] Update study shift info
/**
 * @api {PUT} /api/shift/:shiftId [StudyShift] Update study shift info
 * @apiDescription Update info of a existing study shift
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} shiftId (requried) shiftId passed as param
 *
 * @apiParam {String} start_time (optional) start time of shift, have to follow 'hh:mm' format
 * @apiParam {String} end_time (optional) end time of shift, have to follow 'hh:mm' format
 * @apiParam {Number} day_of_week (optional) day of week of study shift
 *
 * @apiParamExample {json} First Request-Example
 *  http://localhost:3001/api/shift/15
 * {
 *   "start_time": "9:00",
 *   "end_time": "18:30",
 *   "day_of_week": 7
 * }
 *
 * @apiSuccess (Success) {Object} with a properties success_message
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "success_message":"Update study shift success fully: 9:00 - 18:30"
 * }
 */
// #endregion

// #region [StudyShift] Get study shift by id
/**
 * @api {get} /api/shift/:classId [StudyShift] Get study shift by id
 * @apiDescription Get study shift information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} shiftId (required) shiftId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/shift/1
 *
 * @apiSuccess (Success) {Object} Study shift object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id":1,
 *   "start_time":"07:30:00",
 *   "end_time":"09:30:00",
 *   "day_of_week":1,
 *   "center_id":1,
 *   "added_by":1,
 *   "is_active":true,
 *   "is_deleted":false,
 *   "inactivedAt":null,
 *   "deletedAt":null,
 *   "createdAt":"2019-08-21T14:40:57.000Z",
 *   "updatedAt":"2019-08-21T14:40:57.000Z"
 * }
 */
// #endregion

// #region [StudyShift] Delete study shift
/**
 * @api {DELETE} /api/shift/:shiftId [StudyShift] Delete study shift
 * @apiDescription Delete a study shift
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} shiftId (required) shiftId passed as param
 *
 * @apiParamExample {json} First Request-Example
 *  http://localhost:3001/api/shift/15
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * "Deleted study shift id 15, 09:00:00 - 18:30:00"
 */

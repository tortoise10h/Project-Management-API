// #region /api/auth/login
/**
 * @api {post} /api/auth/login [Auth] Login
 * @apiDescription Login api to generate token
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiParam {String} username (optional) username, higher priority than email
 * @apiParam {String} email (optional) provide email if not use username
 * @apiParam {String} password password
 *
 * @apiParamExample {json} Request with username
 *  {
 *      "username": "admin"
 *      "password": "admin"
 *  }
 * @apiParamExample {json} Request with email
 *  {
 *      "email": "admin@digitechglobalco.com"
 *      "password": "admin"
 *  }
 *
 * @apiSuccess (Success) {Object} user Logged user object
 * @apiSuccess (Success) {String} token Token generated
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "user": {
 *          "id": 1,
 *          "username": "admin",
 *          "password": "$2b$10$6vqNvwaMmjZDAMPFXLf61ObnrrWkFPMgnBzrEDjgNNKqslQJ.aw1u",
 *          "email": "admin@digitechglobalco.com",
 *          "is_active": true,
 *          "user_type_id": 1,
 *          "role_id": 1,
 *          "added_by": 1,
 *          "createdAt": "2019-06-18T16:18:43.000Z",
 *          "updatedAt": "2019-06-18T16:18:43.000Z"
 *      },
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjEsInVzZXJfdHlwZV9pZCI6MSwicm9sZV9pZCI6MSwiZXhwIjoxNTYxMDYwMTc4LCJpYXQiOjE1NjEwNTY1Nzh9.PjfH18vFJADG950xiI7izn6UJSbNfq2m5j0nrs18d0w",
 *      "exp": 1561060178
 *  }
 */
// #endregion

// #region /api/auth/refreshToken
/**
 * @api {post} /api/auth/refreshToken [Auth] Refresh token
 * @apiDescription Refresh provided token
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiParam {String} token (optional) current expired token
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjEsInVzZXJfdHlwZV9pZCI6MSwicm9sZV9pZCI6MSwiZXhwIjoxNTYwMTc1Nzg4LCJpYXQiOjE1NjAxNzIxODh9.hsPru8zff-BFa5l_JnwXHQWHIBQ5ViZal6ciuVVHHyg"
 *  }
 *
 * @apiSuccess (Success) {Object} user Logged user object
 * @apiSuccess (Success) {String} token New refreshed token
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "user": {
 *          "id": 1,
 *          "username": "admin",
 *          "password": "$2b$10$6vqNvwaMmjZDAMPFXLf61ObnrrWkFPMgnBzrEDjgNNKqslQJ.aw1u",
 *          "email": "admin@digitechglobalco.com",
 *          "is_active": true,
 *          "user_type_id": 1,
 *          "role_id": 1,
 *          "added_by": 1,
 *          "createdAt": "2019-06-18T16:18:43.000Z",
 *          "updatedAt": "2019-06-18T16:18:43.000Z"
 *      },
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjEsInVzZXJfdHlwZV9pZCI6MSwicm9sZV9pZCI6MSwiZXhwIjoxNTYxMDYwMTc4LCJpYXQiOjE1NjEwNTY1Nzh9.PjfH18vFJADG950xiI7izn6UJSbNfq2m5j0nrs18d0w",
 *      "exp": 1561060178
 *  }
 */
// #endregion

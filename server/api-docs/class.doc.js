// #region [Class] List class
/**
 * @api {get} /api/class [Class] List class
 * @apiDescription Get list class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} id (optional) Id of class
 * @apiParam {String} status (optional) Class status, valid in (Completed, Canceled, Processing and New)
 * @apiParam {String} course_id (optional) Course id
 * @apiParam {String} course_name (optional) Name of course of class
 * @apiParam {String} name (optional) Name of class
 * @apiParam {Number} capacity (optional) Capacity of class
 * @apiParam {Boolean} teacher_assigned (optional) Is this class was assigned teacher or not (true / false)
 * @apiParam {String} teacher_id (optional) Id of teacher to list class of teacher by teacherId
 * @apiParam {Boolean} is_active (optional) Active status of class
 * @apiParam {String} sort (optional) Sort by field. Default: name
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 50. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/class
 *  http://localhost:3001/api/class?offset=1&page=1
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Array} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "totalRecord":3,
 *   "totalPage":3,
 *   "page":1,
 *   "data":[
 *       {
 *           "id":"CLS-COURSE_08-00001",
 *           "name":"Khóa học Anh Ngữ Class",
 *           "status":"New",
 *           "session_studied":0,
 *           "total_students":3,
 *           "total_teachers":2,
 *           "capacity":50,
 *           "start_date":null,
 *           "end_date":null,
 *           "course_id":9,
 *           "center_id":2,
 *           "teacher_assigned":true,
 *           "certification_organization":null,
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-08-26T08:10:14.000Z",
 *           "updatedAt":"2019-08-26T08:10:15.000Z",
 *           "Center":{
 *               "id":2,
 *               "name":"Alter center",
 *               "address":"Address of alter center",
 *               "phone":"0918447845",
 *               "email":"alter@center.com",
 *               "extra_details":"Testing alter center extra details",
 *               "website":null,
 *               "institute_id":1
 *           },
 *           "Course":{
 *               "id":9,
 *               "code":"COURSE_08",
 *               "name":"Khóa học Anh Ngữ",
 *               "excerpt":null,
 *               "detail":"<p><strong>Newly expanded with even&nbsp;more video&nbsp;content!</strong></p><p><br></p><p><strong>More than 45,000</strong>&nbsp;satisfied&nbsp;students worldwide have enrolled in this bestselling course, writing thousands of 5 star reviews:</p><p><br></p><p>\"Easily&nbsp;<strong><em>the best introduction to Blockchain technology and Bitcoins</em></strong>. George explains in such a way that he is going to give a lot of people new career goals.\"</p><p>- Manohar</p><p><br></p><p>\"<em>Great course, with an instructor who is clearly very passionate about the possibilities of blockchain technology. It only takes a couple of hours to complete, but afterwards&nbsp;</em><strong><em>you really feel like you have obtained a good understanding of the fundamentals of blockchains and cryptocurrencies.</em></strong><em>&nbsp;Highly recommended.</em>\"</p><p>- Mark Wever</p><p><br></p><p>\"<em>I have taken several cryptocurrency courses on Udemy and George Levy's are consistently the best. Clear, friendly and well presented,&nbsp;</em><strong><em>the course is laid out in a logical format with easy to follow visual aids.</em></strong>\"</p><p>- Mike Collings</p><p><br></p><p>\"<em>Great course George.</em></p><p><em>I've been involved in the Bitcoin space since early 2013 and I can honestly say that&nbsp;</em><strong><em>you have made some of the more technical aspects of Bitcoin and its underlying technology very simple to understand</em></strong><em>&nbsp;and retain.</em></p><p><em>Thank you for this.</em>\"</p><p>- Jessie Yanger</p><p><br></p><p>\"<em>The&nbsp;</em><strong><em>course is very well organized</em></strong><em>&nbsp;for anyone to learn the technology step-by-step to build the concept and knowledge.</em></p><p><em>Especially, when the new terminology/concept is introduced, the instructor mentioned it briefly and provide the right level of explanation at each stage of the course. This is&nbsp;</em><strong><em>one of the best online training course to learn the new technologies</em></strong><em>, and the way to instruct is the most efficient in the planet!</em>\"</p><p>- Hiro Aoki</p><p>\"Outstanding concepts and very lucid explanations.&nbsp;<strong><em>George explains complex concepts in the simplest of ways</em></strong>. May be after this lesson, can explain this to my 8 year old daughter. :-)\"</p><p>- Avinash Sagar</p><p><br></p><p>\"I am extremely happy that I took the course. The blockchain concepts are very well explained.&nbsp;<strong><em>The instructor's pace, his knowledge and his way of explaining things made the course all the more interesting.</em></strong>&nbsp;I would highly recommend this course.</p><p>A big thanks to George.\"</p><p>- Bharat K Dontamsetti</p><p><br></p><p>\"<em>What I love about the course's lectures is that&nbsp;</em><strong><em>by the end of each lecture I understood the concept presented clearly</em></strong><em>. Also, I like the opening of each lecture, it prepares the student, for me it lowered the fear factor when approaching a new concept in Bitcoin Network and Blockchain.</em></p><p><em>The course doesn't provide only the theoretical part of Bitcoin Network and Blockchain,&nbsp;</em><strong><em>George Levy provides many examples which delivers the objective of the lesson</em></strong><em>&nbsp;(lecture).</em></p><p><em>I&nbsp;</em><strong><em>truly recommend this course for new comers to Bitcoin Network and Blockchain</em></strong><em>.</em></p><p><em>Thank you George Levy for the great course.</em>\"</p><p>- Ali Etoom</p><p><br></p><p><em>And many thousands more...</em></p><p><br></p><p><strong>Quickly get the working knowledge you need and earn your certificate of completion in blockchain and Bitcoin</strong>&nbsp;from a globally recognized blockchain and Bitcoin expert by enrolling now!</p><p><br></p><p>Listening and acting upon valuable feedback from the many tens of thousands of students worldwide who are currently enrolled in this course - I have added new video and valuable content including Smart Contracts, Cryptocurrency, DAOs, DACs and even video lectures on Bitcoin Cash - the new cryptocurrency born out of a Bitcoin Hard Fork.</p><p>I've also included lessons and a downloadable guide on how to best manage any possible future Hard forks in the most profitable and safe manner.</p><p><strong>- Are you looking for a quick, highly-effective and easy way&nbsp;to understand blockchain and Bitcoin, without wasting countless hours sifting through unnecessary filler information?</strong></p><p><strong>- Do you want to get a firm grasp on&nbsp;what blockchain and Bitcoin are all about? Even topics such as Smart Contracts and Digital Tokens?</strong></p><p><strong>- Do you need to quickly learn the key concepts and vocabulary around blockchain and Bitcoin?</strong></p><p>This effective guide will help you understand blockchain and Bitcoin, including more advanced topics such as smart contracts and digital tokens, and will set you well on your way&nbsp;to blockchain and Bitcoin mastery.&nbsp;</p><p>You'll learn the key aspects around Blockchain and Bitcoin, including:</p><ul><li>What is a blockchain?</li><li>What is Bitcoin?</li><li>What are smart contracts?</li><li>What is a cryptocurrency?</li><li>What are digital tokens?</li><li>How blockchain and Bitcoin are related and why it's so important to know the relation.</li><li>Some common misconceptions about blockchain and Bitcoin.</li><li>What is the future of blockchain?</li><li>How to get started with Bitcoin</li></ul><p><strong><em>...and much much more!</em></strong></p><p><br></p><p>You get&nbsp;<strong>lifetime access</strong>&nbsp;and a&nbsp;<strong>30 day, 100% money back guarantee</strong>!</p><p><br></p><p><strong>FREE&nbsp;BONUS:&nbsp;</strong></p><p>I have included two downloadable and printable&nbsp;PDFs</p><ul><li>Glossary including&nbsp;over 100 of the most important blockchain and Bitcoin terms so you can have the essential&nbsp;concepts and language&nbsp;available with you whenever you may need them.</li><li>An Infographic guide with steps on how to best manage any future possible Bitcoin&nbsp;Hard Forks.&nbsp;</li></ul><p>This course will help you quickly master the most important ideas and topics in blockchain and Bitcoin.</p><p>I look forward to seeing you inside!</p><p>Best,</p><p>George Levy, CSBCP, CBP</p><p>Who this course is for:</p><ul><li>The ideal student for this course is someone who wants to quickly understand and expand their knowledge of how blockchain and Bitcoin work as well as how they are applied in business.</li><li>Business people who want to learn more about how blockchain and Bitcoin are impacting the world of business.</li><li>This course does not include any code sampling elements, as such it is not meant as a course for developers who wish to learn how to program blockchain applications.</li></ul>",
 *               "total_sessions":20,
 *               "session_duration":2,
 *               "session_duration_in":"hour",
 *               "fee_currency":"vnd",
 *               "institute_id":1,
 *               "course_category_id":8,
 *               "avatar_location":null,
 *               "trailer_location":null,
 *               "price":6000000,
 *               "type_cost":0,
 *               "releasedAt":null
 *           },
 *           "Schedules":[
 *
 *           ]
 *       }
 *   ]
 * }
 */
// #endregion

// #region [Class] List students of class
/**
 * @api {get} /api/class/:classId/student [Class] List students of class
 * @apiDescription List students of class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Boolean} issued (optional) If issued = true return information of: class, course,
 *                                       student, certificate type, issue certificate, else if
 *                                       issued = false or is ignored => just return information of
 *                                       class, course and student
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} First Request-Example
 *  http://localhost:3000/api/class/CLS-JAVA_BASIC-00001/student?page=1&offset=100&issued=true
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
 *           "theory_marks":5,
 *           "practice_marks":5,
 *           "final_result_level":"Average",
 *           "class_id":"CLS-JAVA_BASIC-00001",
 *           "student_id":"S-00000003",
 *           "issued":true,
 *           "Student":{
 *               "id":"S-00000003",
 *               "first_name":"Hoài An",
 *               "last_name":"Lý",
 *               "gender":"other",
 *               "date_of_birth":"1993-12-20",
 *               "identifier":"231567289854",
 *               "address":"12 Nguyễn Huệ, Quận 1",
 *               "city":"TPHCM",
 *               "country":"Việt Nam",
 *               "zip":"70000",
 *               "photo_location":null,
 *               "phone":"+841546954656",
 *               "email":"hoaian@digitechglobalco.com",
 *               "position":"Operator",
 *               "nationality":"Japanese",
 *               "userid":9
 *           },
 *           "Class":{
 *               "id":"CLS-JAVA_BASIC-00001",
 *               "name":"Java Fundamentals Class",
 *               "status":"Completed",
 *               "session_studied": 0,
 *               "capacity":50,
 *               "start_date":"2019-06-11",
 *               "end_date":"2019-07-30",
 *               "course_id":"1",
 *               "center_id":1,
 *               "teacher_assigned":false,
 *               "Course":{
 *                   "id":1,
 *                   "code":"JAVA_BASIC",
 *                   "name":"Java Fundamentals",
 *                   "excerpt": null,
 *                   "detail":"Java for beginner",
 *                   "total_sessions":20,
 *                   "session_duration":2,
 *                   "session_duration_in":"hour",
 *                   "price":200,
 *                   "type_cost":1,
 *                   "fee_currency":"$",
 *                   "institute_id":1,
 *                   "course_category_id":1,
 *                   "avatar_location":null,
 *                   "trailer_location":null,
 *                   "photo_location":null
 *               }
 *           },
 *           "CertificateTypes":[
 *               {
 *                   "code":"PYTHON",
 *                   "expire_time":8,
 *                   "duration_in":"month",
 *                   "IssueCertificate":{
 *                       "id":1,
 *                       "code":"PYTHON.S-00000003.CLS-JAVA_BASIC-00001.2019",
 *                       "class_student_id":2,
 *                       "certificate_type_id":7,
 *                       "effected_date":"2019-07-17",
 *                       "added_by":1,
 *                       "is_active":true,
 *                       "is_deleted":false,
 *                       "inactivedAt":null,
 *                       "deletedAt":null,
 *                       "createdAt":"2019-07-19T07:30:03.000Z",
 *                       "updatedAt":"2019-07-19T07:30:03.000Z"
 *                   }
 *               }
 *           ]
 *       }
 *   ]
 * }
 *
 *  @apiParamExample {json} Second Request-Example
 *  http://localhost:3000/api/class/CLS-JAVA_BASIC-00001/student?page=1&offset=100&issued=false
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
 *           "id":1,
 *           "theory_marks":5,
 *           "practice_marks":3,
 *           "final_result_level":"Failed",
 *           "class_id":"CLS-JAVA_BASIC-00001",
 *           "student_id":"S-00000001",
 *           "issued":false,
 *           "Student":{
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
 *               "userid":7
 *           },
 *           "Class":{
 *               "id":"CLS-JAVA_BASIC-00001",
 *               "name":"Java Fundamentals Class",
 *               "status":"Completed",
 *               "session_studied": 0,
 *               "capacity":50,
 *               "start_date":"2019-06-11",
 *               "end_date":"2019-07-30",
 *               "course_id":"1",
 *               "center_id":1,
 *               "teacher_assigned":false,
 *               "Course":{
 *                   "id":1,
 *                   "code":"JAVA_BASIC",
 *                   "name":"Java Fundamentals",
 *                   "excerpt": null,
 *                   "detail":"Java for beginner",
 *                   "total_sessions":20,
 *                   "session_duration":2,
 *                   "session_duration_in":"hour",
 *                   "price":200,
 *                   "type_cost": 0,
 *                   "fee_currency":"$",
 *                   "institute_id":1,
 *                   "course_category_id":1,
 *                   "avatar_location":null,
 *                   "trailer_location":null,
 *                   "photo_location":null
 *               }
 *           }
 *       },
 *   ]
  }
 */
// #endregion

// #region [Class] Update all student marks in class
/**
 * @api {put} /api/class/:classId/student [Class] Update all student marks in class
 * @apiDescription Update all student marks in class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Array} students (required) Array of all students in class to update
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/class/CLS-JAVASCRIPT_BASIC-00001/student
 *  [
 *      {
 *          "student_id": "S-00000001",
 *          "theory_marks": 4.5,
 *          "practice_marks": 3
 *      },
 *      {
 *          "student_id": "S-00000002",
 *          "theory_marks": 1,
 *          "practice_marks": 2
 *      },
 *      {
 *          "student_id": "S-00000003",
 *          "theory_marks": 5,
 *          "practice_marks": 5
 *      }
 *  ]
 *
 * @apiSuccess (Success) {Object} result Final updated status of class
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *      "id": "CLS-JAVA_BASIC-00001",
 *      "name": "Java Fundamentals Class",
 *      "status": "Completed",
 *      "capacity": 50,
 *      "start_date": "2019-06-11",
 *      "end_date": "2019-07-30",
 *      "course_id": "1",
 *      "center_id": 1,
 *      "added_by": 1,
 *      "is_active": true,
 *      "is_deleted": false,
 *      "inactivedAt": null,
 *      "deletedAt": null,
 *      "createdAt": "2019-06-28T15:50:58.000Z",
 *      "updatedAt": "2019-06-28T17:03:23.835Z"
 *  }
 */
// #endregion

// #region [Class] Update class info
/**
 * @api {PUT} /api/class/:classId [Class] Update class info
 * @apiDescription Update info of a existing class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} name (optional) Name of class
 * @apiParam {Number} capacity (optional) Max students allow. Max 255 characters.
 * @apiParam {Date} start_date (optional) Date state of class
 * @apiParam {Date} end_date (optional) Date end of class
 * @apiParam {Number} center_id (optional) Center id
 * @apiParam {String} certification_organization (optional) certification organization of class
 * @apiParam {Number} course_id (optional) Course id
 * @apiParam {Array} registration_ids (optional) Array of registration ids
 *
 * @apiParamExample {json} First Request-Example
 *  http://localhost:3001/api/class/CLS-RUBY_BASIC-00001
 * {
 *  "name": "Pascal basic with Huy",
 *  "capacity": 70,
 *  "start_date": "2019-08-17",
 *  "end_date": "2019-12-17",
 *  "course_id": 9,
 *  "center_id": 2,
 *  "certification_organization": "CPP"
 *}
 *
 * @apiSuccess (Success) {Number} number of affected rows,
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "updatedRows":{
 *       "id":"CLS-RUBY_BASIC-00001",
 *       "name":"Pascal basic with Huy",
 *       "status":"Completed",
 *       "session_studied": 0,
 *       "total_students":4,
 *       "total_teachers":2,
 *       "capacity":70,
 *       "start_date":"2019-08-17",
 *       "end_date":"2019-12-17",
 *       "course_id":9,
 *       "center_id":2,
 *       "teacher_assigned":true,
 *       "certification_organization":"CPP",
 *       "added_by":1,
 *       "is_active":true,
 *       "is_deleted":false,
 *       "inactivedAt":null,
 *       "deletedAt":null,
 *       "createdAt":"2019-08-08T09:59:45.000Z",
 *       "updatedAt":"2019-08-08T10:22:07.444Z"
 *   }
 * }
 */
// #endregion

// #region [Class] Assign teachers to class
/**
 * @api {post} /api/class/:classId/teacher/assign [Class] Assign teachers to class
 * @apiDescription Assign teachers to class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Array} list_teacher_id (required) Array (String) of teacher's id
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/class/CLS-JAVA_BASIC-00001/teacher/assign
 *  {
 *      "list_teacher_id": ["TEA-00000002", "TEA-00000003"],
 *  }
 *
 * @apiSuccess (Success) {Object} result successList (array of teacher was assinged to specificed class) and errorList
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "successList": [
 *        {
 *            "is_active": true,
 *            "is_deleted": false,
 *            "id": 1,
 *            "class_id": "CLS-JAVA_BASIC-00001",
 *            "teacher_id": "TEA-00000002",
 *            "added_by": 1,
 *            "updatedAt": "2019-07-08T08:02:41.507Z",
 *            "createdAt": "2019-07-08T08:02:41.507Z"
 *        },
 *        {
 *            "is_active": true,
 *            "is_deleted": false,
 *            "id": 2,
 *            "class_id": "CLS-JAVA_BASIC-00001",
 *            "teacher_id": "TEA-00000003",
 *            "added_by": 1,
 *            "updatedAt": "2019-07-08T08:02:41.521Z",
 *            "createdAt": "2019-07-08T08:02:41.521Z"
 *        }
 *    ],
 *    "errorList": []
 * }
 */
// #endregion

// #region [Class] Update class status
/**
 * @api {put} /api/class/:classId/status [Class] Update class status
 * @apiDescription Update class status
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} status (required) New status want update
 * Just allow update status in 3 case:
             * 1 - NEW -> PROCESSING when now is less than end date of course
             * 2 - PROCESSING -> CANCLED || COMPLETED.
             * 3 - COMPLETED -> GRADE_COMPLETED
             * 4 - COMPLETED -> DONE.
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/class/CLS-JAVA_BASIC-00001/status
 *  {
 *      "status": "Processing",
 *  }
 *
 * @apiSuccess (Success) {Object} Return object have value is status want to update.
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "updated": "Processing"
 * }
 */
// #endregion

// #region [Class] Add class
/**
 * @api {post} /api/class [Class] Add class
 * @apiDescription Add new class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} name (required) name of class
 * @apiParam {Number} capacity (required) capacity of class, min 1
 * @apiParam {Date} start_date (required) start date of class
 * @apiParam {Date} end_date (required) end date of class, have to after start date
 * @apiParam {Number} course_id (required) course id
 * @apiParam {Number} center_id (required) center id
 * @apiParam {String} certification_organization (optional) certification organization of class
 * @apiParam {Array} registration_ids (optional) array of registration id
 * @apiParam {Array} list_teacher_id (optional) list of teacher that were assigned to class when adding new class
 *
 * @apiParamExample {json} Request-Example
 *  {
 *   "name": "Pascal basic with Huy",
 *   "capacity": 70,
 *   "start_date": "2019-08-17",
 *   "end_date": "2019-12-17",
 *   "course_id": 9,
 *   "center_id": 2,
 *   "certification_organization": "CPP",
 *   "registration_ids": ["REG-PASCAL_BASIC-00001", "REG-PASCAL_BASIC-00002"]
 * }
 *
 * @apiSuccess (Success) {Object} new class created
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "status":"New",
 *  "total_teachers":0,
 *  "teacher_assigned":false,
 *  "is_active":true,
 *  "is_deleted":false,
 *  "id":"CLS-PASCAL_BASIC-00001",
 *  "name":"Pascal basic with Huy",
 *  "capacity":70,
 *  "start_date":"2019-08-17",
 *  "end_date":"2019-12-17",
 *  "course_id":9,
 *  "center_id":2,
 *  "certification_organization":"CPP",
 *  "added_by":1,
 *  "total_students":4,
 *  "updatedAt":"2019-08-08T10:18:22.945Z",
 *  "createdAt":"2019-08-08T10:18:22.945Z"
 *}
 */
// #endregion

// #region [Class] Get class by id
/**
 * @api {get} /api/class/:classId [Class] Get class by id
 * @apiDescription Get class information
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} classId (required) classId passed as param
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3001/api/class/CLS-JAVA_BASIC-00001
 *
 * @apiSuccess (Success) {Object} Course object details
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id":"CLS-JAVA_BASIC-00001",
 *   "name":"Java Fundamentals Class",
 *   "status":"Processing",
 *   "session_studied": 0,
 *   "total_students":3,
 *   "total_teachers":2,
 *   "capacity":50,
 *   "start_date":"2019-07-30",
 *   "end_date":"2019-09-30",
 *   "course_id":1,
 *   "center_id":1,
 *   "teacher_assigned":true,
 *   "certification_organization":null,
 *   "added_by":1,
 *   "is_active":true,
 *   "is_deleted":false,
 *   "inactivedAt":null,
 *   "deletedAt":null,
 *   "createdAt":"2019-08-08T09:51:17.000Z",
 *   "updatedAt":"2019-08-08T09:51:18.000Z"
 * }
 */
// #endregion

// #region [Class] Get class by id
/**
 * @api {get} /api/class/:classId/teacher/assign [Class] List teachers assigned of class
 * @apiDescription List teachers of class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 100. Default: 10
 *
 * @apiParamExample {json} First Request-Example
 *  http://localhost:3000/api/class/CLS-JAVA_BASIC-00001/teacher/assign?page=1&offset=100
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *    "totalRecord": 2,
 *    "totalPage": 1,
 *    "page": 1,
 *    "data": [
 *        {
 *            "id": "TEA-00000003",
 *            "fullname": "Dương Tấn Hùng",
 *            "gender": "male",
 *            "date_of_birth": "1990-01-01",
 *            "identifier": "012345667232",
 *            "address": "Đâu đó ở Cộng Hòa",
 *            "phone": "0223456789",
 *            "email": "hungdt@gmail.com",
 *            "position": "Giáo viên mỹ thuật",
 *            "qualification": null,
 *            "userid": 15,
 *            "is_active": true,
 *            "ClassTeachers": [
 *                {
 *                    "class_id": "CLS-JAVA_BASIC-00001",
 *                    "is_active": true
 *                }
 *            ]
 *        },
 *        {
 *            "id": "TEA-00000001",
 *            "fullname": "Võ Thành Danh",
 *            "gender": "male",
 *            "date_of_birth": "1990-01-01",
 *            "identifier": "0123456676142",
 *            "address": "Trái đất",
 *            "phone": "0123456789",
 *            "email": "danhchunhan@gmail.com",
 *            "position": "super teacher",
 *            "qualification": null,
 *            "userid": 13,
 *            "is_active": true,
 *            "ClassTeachers": [
 *                {
 *                    "class_id": "CLS-JAVA_BASIC-00001",
 *                    "is_active": true
 *                }
 *            ]
 *        }
 *    ]
 *}
 */
// #endregion

// #region [Class] List registration of class
/**
 * @api {get} /api/class/:classId/registration [Class] List all registrations with pagination of class
 * @apiDescription List all registrations of class in system
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} classId (required) classId passed as params
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
 *  http://localhost:3001/api/class/CLS-JAVA_BASIC-00001/registration
 *
 * @apiSuccess (Success) {Number} totalRecord Total records in database
 * @apiSuccess (Success) {Number} totalPage Total pages for pagination
 * @apiSuccess (Success) {Number} page Current page
 * @apiSuccess (Success) {Array} data Array of data
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *  "totalRecord":1,
 *  "totalPage":1,
 *  "page":1,
 *  "data":[
 *      {
 *          "id":"REG-JAVA_BASIC-00001",
 *          "message":"Registration #1 for customer: Digitech Global Co",
 *          "status":"Recognized",
 *          "course_fee":200,
 *          "total_students":3,
 *          "total_cost":600,
 *          "cost_currency":"$",
 *          "course_id":"1",
 *          "customer_id":1,
 *          "class_id":"CLS-JAVA_BASIC-00001",
 *          "added_by":1,
 *          "is_deleted":false,
 *          "inactivedAt":null,
 *          "deletedAt":null,
 *          "createdAt":"2019-08-08T09:51:17.000Z",
 *          "updatedAt":"2019-08-08T09:51:18.000Z",
 *          "Customer":{
 *              "name":"Digitech Global Co"
 *          },
 *          "Course":{
 *              "name":"Java Fundamentals"
 *          }
 *      }
 *  ]
 *}
 */
// #endregion

// #region [Class] List schedule of class
/**
 * @api {get} /api/class/:classId/schedule [Class] List schedule of class
 * @apiDescription Get list schedule
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParamExample {json} Request-Example
 *  http://localhost:3000/api/class/CLS-JAVA_BASIC-00001
 *
 * @apiSuccess (Success) {Array} Array of data
 *
 * @apiSuccessExample {Array} Success-Response:
 * HTTP/1.1 200 OK
 *  [
 *   {
 *       "id":1,
 *       "class_id":"CLS-JAVA_BASIC-00001",
 *       "study_shift_id":7,
 *       "added_by":1,
 *       "is_deleted":false,
 *       "deletedAt":null,
 *       "createdAt":"2019-08-21T11:04:25.000Z",
 *       "updatedAt":"2019-08-21T11:04:25.000Z",
 *       "StudyShift":{
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
 *           "createdAt":"2019-08-21T10:35:12.000Z",
 *           "updatedAt":"2019-08-21T10:35:12.000Z"
 *       }
 *   },
 *   {
 *       "id":2,
 *       "class_id":"CLS-JAVA_BASIC-00001",
 *       "study_shift_id":14,
 *       "added_by":1,
 *       "is_deleted":false,
 *       "deletedAt":null,
 *       "createdAt":"2019-08-21T11:04:25.000Z",
 *       "updatedAt":"2019-08-21T11:04:25.000Z",
 *       "StudyShift":{
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
 *           "createdAt":"2019-08-21T10:35:12.000Z",
 *           "updatedAt":"2019-08-21T10:35:12.000Z"
 *       }
 *   },
 *   {
 *       "id":3,
 *       "class_id":"CLS-JAVA_BASIC-00001",
 *       "study_shift_id":1,
 *       "added_by":1,
 *       "is_deleted":false,
 *       "deletedAt":null,
 *       "createdAt":"2019-08-21T11:04:25.000Z",
 *       "updatedAt":"2019-08-21T11:04:25.000Z",
 *       "StudyShift":{
 *           "id":1,
 *           "start_time":"07:30:00",
 *           "end_time":"09:30:00",
 *           "day_of_week":1,
 *           "center_id":1,
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-08-21T10:35:12.000Z",
 *           "updatedAt":"2019-08-21T10:35:12.000Z"
 *       }
 *   },
 *   {
 *       "id":4,
 *       "class_id":"CLS-JAVA_BASIC-00001",
 *       "study_shift_id":8,
 *       "added_by":1,
 *       "is_deleted":false,
 *       "deletedAt":null,
 *       "createdAt":"2019-08-21T11:04:25.000Z",
 *       "updatedAt":"2019-08-21T11:04:25.000Z",
 *       "StudyShift":{
 *           "id":8,
 *           "start_time":"10:00:00",
 *           "end_time":"11:30:00",
 *           "day_of_week":1,
 *           "center_id":1,
 *           "added_by":1,
 *           "is_active":true,
 *           "is_deleted":false,
 *           "inactivedAt":null,
 *           "deletedAt":null,
 *           "createdAt":"2019-08-21T10:35:12.000Z",
 *           "updatedAt":"2019-08-21T10:35:12.000Z"
 *       }
 *   }
 * ]
 */
// #endregion

// #region [Class] Add schedules to class
/**
 * @api {post} /api/class/:classId/schedule [Class] Add schedules to class
 * @apiDescription Add schedules to class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} classId (required) classId passed as param
 * @apiParam {Array[Object]} Array of study_shift_id (required)
 *
 * @apiParamExample {json} Request-Example
 *   http://localhost:3001/api/class/CLS-JAVASCRIPT_BASIC-00001/schedule
 *  [
 *   {
 *       "study_shift_id": 4
 *   },
 *   {
 *       "study_shift_id": 3
 *   }
 *  ]
 *
 * @apiSuccess (Success) {Object} new list of schedule created
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "success_list":[
 *       {
 *           "is_deleted":false,
 *           "id":1,
 *           "study_shift_id":4,
 *           "added_by":1,
 *           "class_id":"CLS-JAVASCRIPT_BASIC-00001",
 *           "updatedAt":"2019-08-21T14:45:16.635Z",
 *           "createdAt":"2019-08-21T14:45:16.635Z"
 *       },
 *       {
 *           "is_deleted":false,
 *           "id":2,
 *           "study_shift_id":3,
 *           "added_by":1,
 *           "class_id":"CLS-JAVASCRIPT_BASIC-00001",
 *           "updatedAt":"2019-08-21T14:45:16.646Z",
 *           "createdAt":"2019-08-21T14:45:16.646Z"
 *       }
 *   ],
 *   "failed_list":[
*
 *   ]
 * }
 */
// #endregion

// #region [Class] Update schedule
/**
 * @api {PUT} /api/class/:classId/schedule/:scheduleId [Class] Update schedule
 * @apiDescription Update info of a schedule
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} classId (required) classId passed as param
 * @apiParam {Number} scheduleId (required) scheduleId passed as param
 *
 * @apiParam {Number} study_shift_id (optional) Id of study shift
 *
 * @apiParamExample {json} First Request-Example
 *  http://localhost:3001/api/class/CLS-JAVASCRIPT_BASIC-00001/schedule/2
 * {
 *  "study_shift_id": 7
 *}
 *
 * @apiSuccess (Success) {Number} number of affected rows,
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *  1
 * ]
 */

// #region [Class] Delete schedule
/**
 * @api {DELETE} /api/class/:classId/schedule/:scheduleId [Class] Delete schedule
 * @apiDescription Delete a schedule
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} classId (required) classId passed as param
 * @apiParam {Number} scheduleId (required) scheduleId passed as param
 *
 * @apiParamExample {json} First Request-Example
 *  http://localhost:3001/api/class/CLS-JAVASCRIPT_BASIC-00001/schedule/2
 *
 * @apiSuccess (Success) {Number} number of affected rows,
 *
 * @apiSuccessExample {Object} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *  1
 * ]
 */

// #region [Class] List time table of class
/**
 * @api {get} /api/class/:classId/timetable [Class] List time table of class
 * @apiDescription Get list class
 * @apiVersion 1.0.0
 * @apiGroup MiM
 *
 * @apiHeader {String} Authorization Users unique access-key.
 *
 * @apiParam {String} classId (required) classId passed as param
 *
 * @apiParam {String} description (optional) Description of time table
 * @apiParam {Boolean} is_studied (optional) Is that time table was studied or not (true/false)
 * @apiParam {Number} session_index (optional) Index of time table in the whole session
 * @apiParam {Number} date_of_week (optional) Day of week of time table (Sunday:0, Monday:1, Tuesday:2,...)
 * @apiParam {Date} date_study (optional) Study date of time table
 * @apiParam {String} same (optional) same for search, default 'month'
 * @apiParam {String} sort (optional) Sort by field. Default: session_index
 * @apiParam {String} direction (optional) Sort direction. Defaullt: asc
 * @apiParam {Number} page (optional) Page to get. Default: 1
 * @apiParam {Number} offset (optional) Max offset fetch once. Max 50. Default: 10
 *
 * @apiParamExample {json} Request-Example
 *  http://:3001/api/class/CLS-JAVASCRIPT_BASIC-00001/timetable
 *
 * @apiSuccess (Success) {Array} Array of data
 *
 * @apiSuccessExample {Array} Success-Response:
 * HTTP/1.1 200 OK
 *  [
 * {
 *   "id": 1,
 *   "class_id": "CLS-JAVASCRIPT_BASIC-00001",
 *   "date_study": "2019-07-31",
 *   "start_time": "07:30:00",
 *   "end_time": "09:30:00",
 *   "day_of_week": 3,
 *   "session_index": 1,
 *   "is_studied": true,
 *   "description": null,
 *   "added_by": 1
 * },
 * {
 *   "id": 2,
 *   "class_id": "CLS-JAVASCRIPT_BASIC-00001",
 *   "date_study": "2019-08-01",
 *   "start_time": "07:30:00",
 *   "end_time": "09:30:00",
 *   "day_of_week": 4,
 *   "session_index": 2,
 *   "is_studied": true,
 *   "description": null,
 *   "added_by": 1
 * },
 * ....
 * {
 *   "id": 59,
 *   "class_id": "CLS-JAVASCRIPT_BASIC-00001",
 *   "date_study": "2019-11-14",
 *   "start_time": "07:30:00",
 *   "end_time": "09:30:00",
 *   "day_of_week": 4,
 *   "session_index": 20,
 *   "is_studied": false,
 *   "description": null,
 *   "added_by": 1
 * }
 *]
 */
// #endregion

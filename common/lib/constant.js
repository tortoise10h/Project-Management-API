const constant = {
  SERVER: {
    API_MAX_OFFSET: 100,
    API_DEFAULT_OFFSET: 10
  },
  PASSWORD_HASH_SALT_ROUNDS: 10,
  GENDER: {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
  },
  USER_ACTION: {
    LOGIN: 'Login',
    SIGNUP: 'Signup',
    CONFIRM_EMAIL: 'ConfirmEmail',
    REFRESH: 'Refresh',
    REGISTER: 'Register',
    ADD_COURSE: 'AddCourse',
    UPDATE_COURSE: 'UpdateCourse',
    ADD_STUDENT: 'AddStudent',
    START_CLASS: 'StartClass',
    APPROVE_ENQUIRY: 'ApproveEnquiry',
    DESCLINE_ENQUIRY: 'DesclineEnquiry'
  },
  USER_ROLE: {
    ADMIN: 'Admin',
    LEADER: 'Leader',
    MEMEBER: 'Member'
  },
  JWT_SECRET: '$banana-project-management-api-jwt-secret$',
  JWT_EXPIRE_TIME: 60 * 60,
  DB_MODEL: {
    USER: 'User',
    PROJECT: 'Project'
  },
  UNNECESSARY_FIELDS: [
    'createdAt',
    'updatedAt',
    'deletedAt',
    'inactivedAt',
    'is_deleted'
  ],
  MONTH_IN_YEAR: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}

module.exports = constant

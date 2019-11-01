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
  TODO_STATUS: {
    NEW: 'New',
    PROCESSING: 'Processing',
    DONE: 'Done',
    CANCEL: 'Cancel'
  },
  PROJECT_STATUS: {
    NEW: 'New',
    PROCESSING: 'Processing',
    DONE: 'Done',
    CANCEL: 'Cancel'
  },
  USER_ROLE: {
    ADMIN: 'Admin',
    LEADER: 'Leader',
    MEMBER: 'Member'
  },
  TIME_UNIT: {
    DAY: 'Day',
    HOUR: 'Hour',
    MINUTE: 'Minute'
  },
  JWT_SECRET: '$banana-project-management-api-jwt-secret$',
  JWT_EXPIRE_TIME: 60 * 60,
  DB_MODEL: {
    USER: 'User',
    PROJECT: 'Project',
    USER_PROJECT: 'UserProject',
    TASK: 'Task',
    USER_TASK: 'UserTask',
    COLUMN: 'Column',
    LABEL: 'Label',
    TASK_LABEL: 'TaskLabel',
    LOG: 'Log',
    USER_LOG: 'UserLog',
    MEDIA: 'Media',
    TODO: 'Todo'
  },
  UNNECESSARY_FIELDS: [
    'createdAt',
    'updatedAt',
    'deletedAt',
    'inactivedAt',
    'is_deleted'
  ],
  LOG_ACTION: {
    ADD: 'Add',
    UPDATE: 'Update',
    REMOVE: 'Remove',
    MOVE_TASK: 'Move Task'
  },
  KEY_NAME: {
    title: 'Title',
    description: 'Description',
    start_date: 'Start date',
    end_date: 'End date',
    status: 'Status',
    role: 'Role',
    color: 'Color',
    due_date: 'Due date'
  },
  MONTH_IN_YEAR: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  PROJECT_TIMEZONE: 'Asia/Ho_Chi_Minh'
}

module.exports = constant

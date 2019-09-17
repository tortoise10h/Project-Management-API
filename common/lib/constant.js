const constant = {
  SERVER: {
    API_MAX_OFFSET: 100,
    API_DEFAULT_OFFSET: 10,
  },
  PASSWORD_HASH_SALT_ROUNDS: 10,
  GENDER: {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
  },
  REGISTRATION_STATUS: {
    NEW: 'New',
    PROCESSING: 'Processing',
    APRROVED: 'Approved',
    DECLINED: 'Declined',
    RECOGNIZED: 'Recognized',
  },
  ENQUIRY_STATUS: {
    NEW: 'New',
    PROCESSING: 'Processing',
    APRROVED: 'Approved',
    DECLINED: 'Declined',
  },
  CLASS_STATUS: {
    NEW: 'New',
    PROCESSING: 'Processing',
    COMPLETED: 'Completed',
    GRADE_COMPLETED: 'Grade Completed',
    CANCELLED: 'Cancelled',
    DONE: 'Done',
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
    DESCLINE_ENQUIRY: 'DesclineEnquiry',
  },
  // All customer is enterprise
  CUSTOMER_TYPE: {
    PERSONAL: 'PERSONAL', // Sẽ chưa sử dụng trong phiên bản này
    COMPANY: 'COMPANY',
  },
  USER_TYPE: {
    PERSONAL: 'PERSONAL',
    COMPANY: 'COMPANY',
  },
  USER_ROLE: {
    ADMIN: 'admin', // can "do everything" on the institute
    MANAGER: 'manager', // a lesser administrator role, "do every thing in center"
    TEACHER: 'teacher', // can manage and add content to courses
    NON_EDITING_TEACHER: 'non_editing_teacher', // can grade in courses but not edit them
    CUSTOMER: 'customer', // can access and participate in courses
    STUDENT: 'student', // can access and assigned into class
    LOGINED_USER: 'logined_user', // can view courses but not participate
  },
  JWT_SECRET: '$edu-mim-api-jwt-secret$',
  JWT_EXPIRE_TIME: 60 * 60,
  DB_MODEL: {
    ATTENDANCE: 'Attendance',
    LOG: 'Log',
    NOTICE: 'Notice',
    USER_PASSWORD_HISTORY: 'UserPasswordHistory',
    USER: 'User',
    CUSTOMER: 'Customer', // Enterprise
    STUDENT: 'Student',
    SITE: 'Site',
    ENQUIRY: 'Enquiry',
    COURSE_CATEGORY: 'CourseCategory',
    COURSE: 'Course',
    COURSE_UNIT: 'CourseUnit',
    REGISTRATION: 'Registration',
    REGISTRATION_DETAIL: 'RegistrationDetail',
    CLASS: 'Class',
    CLASS_STUDENT: 'ClassStudent',
    CERTIFICATE_TYPE: 'CertificateType',
    CERTIFICATE_FORMAT: 'CertificateFormat',
    ISSUE_CERTIFICATE: 'IssueCertificate',
    TEACHER: 'Teacher',
    CLASS_TEACHER: 'ClassTeacher',
    STUDY_SHIFT: 'StudyShift',
    SCHEDULE: 'Schedule',
    DOCUMENT: 'Document',
    HOLIDAY: 'Holiday',
    TIMETABLE: 'Timetable',
  },
  FINAL_RESULT_LEVEL: {
    FAILED: 'Failed',
    AVERAGE: 'Average',
    GOOD: 'Good',
    EXCELLENT: 'Excellent',
  },
  COURSE_UNIT_TYPE: {
    SECTION: 'Section',
    LESSON: 'Lesson',
    QUIZZ: 'Quizz',
  },
  CERTIFICATE_FORMAT: {
    MANAGING: 'managing_safely',
    COURSE: 'course_certification',
    HLATVSL: 'hlatvsl_certificattion',
    ATLD: 'atld_certification',
    ATD: 'atd_certification',
  },
  UNNECESSARY_FIELDS: [
    'createdAt',
    'updatedAt',
    'deletedAt',
    'inactivedAt',
    'is_deleted',
  ],
  COURSE_TYPE_COST: {
    BY_COURSE: 0,
    BY_SESSION: 1,
  },
  MONTH_IN_YEAR: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],

};

module.exports = constant;

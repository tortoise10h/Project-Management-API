class Config {
  constructor() {
    this.global = {
      env: process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development',
      passwordAdmin: process.env.PASSWORD_ADMIN ? process.env.PASSWORD_ADMIN.trim() : '12345678',
      frontendPageUrl: process.env.FRONTEND_PAGE_URL ? process.env.FRONTEND_PAGE_URL.trim() : 'http://localhost:3002',
    };
  }

  getLoggerConfig() {
    return {
      consoleEnable: process.env.LOGGER_CONSOLE_ENABLE ? process.env.LOGGER_CONSOLE_ENABLE === 'true' : true,
      consoleLevel: process.env.LOGGER_CONSOLE_LEVEL ? process.env.LOGGER_CONSOLE_LEVEL.trim() : 'debug',
      fileEnable: process.env.LOGGER_FILE_ENABLE ? process.env.LOGGER_FILE_ENABLE.trim() === 'true' : false,
      fileLevel: process.env.LOGGER_FILE_LEVEL ? process.env.LOGGER_FILE_LEVEL.trim() : 'info',
      filePath: process.env.LOGGER_FILE_PATH ? process.env.LOGGER_FILE_PATH.trim() : './logs',
      fileName: process.env.LOGGER_FILE_NAME ? process.env.LOGGER_FILE_NAME.trim() : 'learnnow-mim-api.log',
      fileMaxSize: process.env.LOGGER_FILE_MAX_SIZE ? parseInt(process.env.LOGGER_FILE_MAX_SIZE.trim(), 10) : 1048576,
    };
  }

  getServerConfig() {
    return {
      port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT.trim()) : 3000,
      uploadLocation: process.env.SERVER_FILE_LOCATION ? process.env.SERVER_FILE_LOCATION.trim() : './uploads',
    };
  }

  getMimDatabaseConfig() {
    return {
      host: process.env.MIM_DB_HOST ? process.env.MIM_DB_HOST.trim() : '127.0.0.1',
      port: process.env.MIM_DB_PORT ? Number(process.env.MIM_DB_PORT) : 3306,
      username: process.env.MIM_DB_USERNAME ? process.env.MIM_DB_USERNAME.trim() : 'root',
      password: process.env.MIM_DB_PASSWORD ? process.env.MIM_DB_PASSWORD.trim() : '123456',
      database: process.env.MIM_DB_DATABASE ? process.env.MIM_DB_DATABASE.trim() : 'learnnow-mim',
      timezone: process.env.MIM_DB_TIMEZONE ? process.env.MIM_DB_TIMEZONE.trim() : 'Etc/GMT0',
      loggerEnable: process.env.MIM_DB_LOGGER_ENABLE ? process.env.MIM_DB_LOGGER_ENABLE.trim() === 'true' : false,
    };
  }

  getEmailConfig() {
    return {
      emailNoReply: {
        address: process.env.EMAIL_NO_REPLY_ADDRESS ? process.env.EMAIL_NO_REPLY_ADDRESS.trim() : 'noreply@digitechglobalco.com',
        password: process.env.EMAIL_NO_REPLY_PASSWORD ? process.env.EMAIL_NO_REPLY_PASSWORD.trim() : 'EvJDm38bkuvTPSmm',
      },
    };
  }

  getReCaptchaConfig() {
    return {
      skip: process.env.RECAPTCHA_SKIP ? process.env.RECAPTCHA_SKIP.trim() === 'true' : false,
      v2: {
        sitekey: process.env.RECAPTCHA_V2_SITE_KEY ? process.env.RECAPTCHA_V2_SITE_KEY.trim() : '6LfeCLUUAAAAALLSgBWnBu4zb49-igc4oIUCNAI7',
        secretKey: process.env.RECAPTCHA_V2_SECRET_KEY ? process.env.RECAPTCHA_V2_SECRET_KEY.trim() : '6LdC-7QUAAAAAJQJthjT-6oBSwYgxvK8X1NsEgYF',
      },
    };
  }
}

module.exports = new Config();

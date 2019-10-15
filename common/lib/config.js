class Config {
  constructor () {
    this.global = {
      env: process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development',
      passwordAdmin: process.env.PASSWORD_ADMIN ? process.env.PASSWORD_ADMIN.trim() : '12345678',
      frontendPageUrl: process.env.FRONTEND_PAGE_URL ? process.env.FRONTEND_PAGE_URL.trim() : 'http://localhost:5001'
    }
  }

  getLoggerConfig () {
    return {
      consoleEnable: process.env.LOGGER_CONSOLE_ENABLE ? process.env.LOGGER_CONSOLE_ENABLE === 'true' : true,
      consoleLevel: process.env.LOGGER_CONSOLE_LEVEL ? process.env.LOGGER_CONSOLE_LEVEL.trim() : 'debug',
      fileEnable: process.env.LOGGER_FILE_ENABLE ? process.env.LOGGER_FILE_ENABLE.trim() === 'true' : false,
      fileLevel: process.env.LOGGER_FILE_LEVEL ? process.env.LOGGER_FILE_LEVEL.trim() : 'info',
      filePath: process.env.LOGGER_FILE_PATH ? process.env.LOGGER_FILE_PATH.trim() : './logs',
      fileName: process.env.LOGGER_FILE_NAME ? process.env.LOGGER_FILE_NAME.trim() : 'projct-management-api.log',
      fileMaxSize: process.env.LOGGER_FILE_MAX_SIZE ? parseInt(process.env.LOGGER_FILE_MAX_SIZE.trim(), 10) : 1048576
    }
  }

  getServerConfig () {
    return {
      port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT.trim()) : 5000,
      uploadLocation: process.env.SERVER_FILE_LOCATION ? process.env.SERVER_FILE_LOCATION.trim() : './uploads'
    }
  }

  getMimDatabaseConfig () {
    return {
      host: process.env.MIM_DB_HOST ? process.env.BANANA_DB_HOST.trim() : '127.0.0.1',
      port: process.env.BANANA_DB_PORT ? Number(process.env.BANANA_DB_PORT) : 3307,
      username: process.env.BANANA_DB_USERNAME ? process.env.BANANA_DB_USERNAME.trim() : 'root',
      password: process.env.BANANA_DB_PASSWORD ? process.env.BANANA_DB_PASSWORD.trim() : '123456',
      database: process.env.BANANA_DB_DATABASE ? process.env.BANANA_DB_DATABASE.trim() : 'banana-project-management',
      timezone: process.env.BANANA_DB_TIMEZONE ? process.env.BANANA_DB_TIMEZONE.trim() : 'Etc/GMT0',
      loggerEnable: process.env.BANANA_DB_LOGGER_ENABLE ? process.env.BANANA_DB_LOGGER_ENABLE.trim() === 'true' : false
    }
  }

  getEmailConfig () {
    return {
      emailBanana: {
        address: process.env.EMAIL_BANANA_ADDRESS ? process.env.EMAIL_BANANA_ADDRESS.trim() : 'bananaboys249@gmail.com',
        password: process.env.EMAIL_BANANA_PASSWORD ? process.env.EMAIL_BANANA_PASSWORD.trim() : 'bananaboys@'
      }
    }
  }

  getReCaptchaConfig () {
    return {
      skip: process.env.RECAPTCHA_SKIP ? process.env.RECAPTCHA_SKIP.trim() === 'true' : false,
      v2: {
        sitekey: process.env.RECAPTCHA_V2_SITE_KEY ? process.env.RECAPTCHA_V2_SITE_KEY.trim() : '6LfeCLUUAAAAALLSgBWnBu4zb49-igc4oIUCNAI7',
        secretKey: process.env.RECAPTCHA_V2_SECRET_KEY ? process.env.RECAPTCHA_V2_SECRET_KEY.trim() : '6LdC-7QUAAAAAJQJthjT-6oBSwYgxvK8X1NsEgYF'
      }
    }
  }
}

module.exports = new Config()

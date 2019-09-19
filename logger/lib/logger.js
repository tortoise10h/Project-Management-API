const { createLogger, transports, format } = require('winston')
const moment = require('moment')

class Logger {
  /**
     * constructor
     * @param {Object} config logger config
     *  consoleEnable: Enable console logger
     *  consoleLevel: Specific priority level of logger console: error, warn, info, verbose, debug, silly
     *  fileEnable: Enable file logger
     *  fileLevel: Specific priority level of logger file: error, warn, info, verbose, debug, silly
     *  filePath: Folder contains log
     *  fileName: Logger file name
     *  fileMaxSize: Define maximum storage for a log file. It will rotate after maximum log exceeds
     */
  constructor (config) {
    const transportOptions = []

    /** Add console transports if CONSOLE LOG ENABLE */
    if (config.consoleEnable) {
      const consoleTransport = new transports.Console({
        level: config.consoleLevel,
        format: format.combine(
          format.printf((info) => {
            info.level = `[${moment.utc().format('YYYY/MM/DD hh:mm:ss.SSS')}] ${info.level}`
            return info
          }),
          format.colorize(),
          format.simple()
        )
      })
      transportOptions.push(consoleTransport)
    }

    /** Add file transports if FILE LOG ENABLE */
    if (config.fileEnable) {
      const fileTransport = new transports.File({
        level: config.fileLevel,
        filename: `${config.filePath}/${config.fileName}`,
        maxsize: config.fileMaxSize,
        format: format.combine(
          format.timestamp(),
          format.json()
        )
      })
      transportOptions.push(fileTransport)
    }
    this.logger = createLogger({
      transports: transportOptions
    })
    this.loggerLevels = ['error', 'warn', 'info', 'debug', 'verbose', 'silly']
    this.loggerLevels.forEach((level) => {
      this[level] = (message, meta) => this.log(message, meta, level)
    })
  }

  log (message, meta, level) {
    this.logger[level](message, meta)
  }
}

module.exports = Logger

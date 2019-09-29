const exitProcess = () => {
  setTimeout(() => {
    process.exit(1)
  }, 100)
}

require('dotenv').config({})
global.Promise = require('bluebird')
const { config, util } = require('./common')
const Logger = require('./logger')
const Database = require('./database')

/** Logger */
global.logger = new Logger(config.getLoggerConfig())

/** Global process events */
Promise.onPossiblyUnhandledRejection(async (error) => {
  await util.traceError(error)
  exitProcess()
})
process.on('uncaughtException', async (error) => {
  await util.traceError(error)
  exitProcess()
})
process.on('unhandledRejection', async (error) => {
  await util.traceError(error)
  exitProcess()
})

const start = async () => {
  try {
    /** Connect database */
    const bananaDatabase = new Database(config.getMimDatabaseConfig(), logger.silly)
    await bananaDatabase.connect()

    /** Close database */
    process.on('SIGINT', async () => {
      await bananaDatabase.close()
      exitProcess()
    })

    /** Server */
    const Server = require('./server') // eslint-disable-line global-require
    const server = new Server(config.getServerConfig(), bananaDatabase)
    server.initExpressMiddleWares()
    await server.initModels()
    await server.listen()
  } catch (error) {
    // Todo: handle specific case of error. Exit process if neccessary
    util.traceError(error)
    exitProcess()
  }
}

start()

const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const validator = require('express-validator')
const cors = require('cors')
const httpStatus = require('http-status')
const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()
const http = require('http').Server(app)
const router = require('./routes')
const { APIError, apiResponse } = require('./helpers')
const { util } = require('../common')

class Server {
  /**
     * constructor
     * @param {Object} config
     *  port: server port
     */
  constructor (config, database) {
    this.port = config.port
    this.http = http
    this.database = database
  }

  async initModels () {
    const modelFactory = require('./models') // eslint-disable-line global-require
    await modelFactory.build(this.database.getConnection())
  }

  initExpressMiddleWares () {
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(validator())

    /** Escape XSS attack */
    app.use((req, res, next) => {
      // this.sanitize(req, req.body);
      this.sanitize(req, req.query)
      this.sanitize(req, req.params)
      next()
    })

    app.use(errorHandler())
    app.use(cors())

    app.use((req, res, next) => {

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true)

      // Pass to next layer of middleware
      next()
    })

    /** Log request */
    app.use((req, res, next) => {
      this.logRequest(req)
      next()
    })

    /** All routes */
    app.use('/api', router)

    /** Catch 404 & forward to error handler */
    app.use((req, res, next) => {
      const err = new APIError('Api not found', httpStatus.NOT_FOUND)
      next(err)
    })

    /** Error handler */
    app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
      apiResponse.error(res, err)
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }
      if (err instanceof APIError) {
        if (err.message === 'Api not found') {
          logger.error(`Error: Api not found, ${req.method} => ${req.originalUrl}`)
          return
        }
        if (err.status === httpStatus.BAD_REQUEST) {
          if (Array.isArray(err.message)) {
            err.message = err.message.map(e => e.message).join(', ')
          }
        }
      }
      util.traceError(err)
    })
  }

  listen () {
    return new Promise((resolve, reject) => {
      this.http.listen(this.port, (error) => {
        if (error) {
          reject(error)
          return
        }
        logger.info(`[Server] Listening on port ${this.port}`)
        resolve(true)
      })
    })
  }

  sanitize (req, obj) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'string') {
        req.sanitize(key).escape()
      }
    })
  }

  logRequest (req) {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const { originalUrl, method } = req
    logger.info(`[Ip] ${clientIp} | [${method}] ${originalUrl}`)
    if (method.toUpperCase() !== 'GET') logger.info(`[req.body] => ${JSON.stringify(req.body)}`)
  }
}

module.exports = Server

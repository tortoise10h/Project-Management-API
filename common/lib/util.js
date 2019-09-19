const _ = require('lodash')
const fs = require('fs')
const crypto = require('crypto')

const constant = require('./constant')

const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

class Util {
  traceError (error) {
    if (error instanceof Error) {
      logger.error(error.stack)
      return
    }
    logger.error(error)
  }

  paginate (result, page, offset) {
    return {
      totalRecord: result.count,
      totalPage: Math.ceil(result.count / offset),
      page,
      data: result.rows
    }
  }

  collectError (details) {
    return _
      .uniqBy(details, 'context.key')
      .map(e => ({
        field: e.context.key,
        value: e.context.value,
        message: e.message
      }))
  }

  createFolder (location) {
    const folders = location.split('/')
    let destination = `${folders[0]}`
    if (folders.length > 2) {
      for (let i = 1; i < folders.length; i++) {
        destination += `/${folders[i]}`
        if (!fs.existsSync(destination)) {
          fs.mkdirSync(destination)
        }
      }
    }
  }

  isEmail (input) {
    return emailRegex.test(input)
  }

  isValidPhoneNumber (input) {
    return phoneNumberRegex.test(input)
  }

  generateUsername (email) {
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format to generate username')
    }
    const [prefix] = email.split('@')
    let sail = ''
    for (let i = 0; i < 20; i++) {
      sail += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    const hash = crypto.createHash('md5').update(sail).digest('hex')

    return `${prefix}${hash.substr(0, 4)}`
  }

  calcualteTotalCost (course) {
    if (!course) return null
    const {
      type_cost: method, price = 0, total_sessions: totalSessions = 0
    } = course
    const amount = method === constant.COURSE_TYPE_COST.BY_COURSE ? 1 : totalSessions
    return price * amount
  }
}

module.exports = new Util()

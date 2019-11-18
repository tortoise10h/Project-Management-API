const moment = require('moment-timezone')

const { constant } = require('../../common')

const logUpdate = (validaterValue, updatedObj) => {
  let logMessage = ''
  Object.keys(validaterValue).forEach((key) => {
    switch (typeof validaterValue[key]) {
      case 'number':
      case 'boolean':
      case 'string':
        logMessage += `[${constant.KEY_NAME[key]}] from "${updatedObj[key]}" to "${validaterValue[key]}", `
        break
      case 'object':
        if (validaterValue[key] instanceof Date) {
          const oldDate = updatedObj[key] ? moment(updatedObj[key]).format('DD/MM/YYYY') : ''
          const newDate = validaterValue[key] ? moment(validaterValue[key]).format('DD/MM/YYYY') : ''
          logMessage += `[${constant.KEY_NAME[key]}] from "${oldDate}" to "${newDate}", `
        }
        break
      default:
        break
    }
  })
  return logMessage
}

const logAddMany = (successList, nameKey) => {
  let logMessage = ''
  successList.forEach((item) => {
    logMessage += `${item[nameKey]}, `
  })
  return logMessage
}

module.exports.logUpdate = logUpdate
module.exports.logAddMany = logAddMany

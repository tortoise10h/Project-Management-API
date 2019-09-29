const Sequelize = require('sequelize')
const moment = require('moment')
const IModel = require('./model.index')
const { constant } = require('../../common')

const schema = {
  id: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  log_id: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  inactivedAt: {
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE
  }
}

class UserLogModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'user_log' }
    super(schema, sequelize, constant.DB_MODEL.USER_LOG, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    this.model.addHook('beforeUpdate', async (userLog) => {
      if (userLog.is_active === false) userLog.inactivedAt = moment.utc()
      if (userLog.is_deleted === true) userLog.deletedAt = moment.utc()
    })
  }
}

module.exports = UserLogModel

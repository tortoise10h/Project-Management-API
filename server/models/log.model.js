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
  action: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  project_id: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  user_id: {
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

class LogModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'log' }
    super(schema, sequelize, constant.DB_MODEL.LOG, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    this.model.addHook('beforeUpdate', async (log) => {
      if (log.is_active === false) log.inactivedAt = moment.utc()
      if (log.is_deleted === true) log.deletedAt = moment.utc()
    })
  }
}

module.exports = LogModel

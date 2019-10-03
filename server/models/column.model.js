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
  title: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  created_by: {
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
  },
  project_id: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  }
}

class ColumnModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'column' }
    super(schema, sequelize, constant.DB_MODEL.COLUMN, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    this.model.addHook('beforeUpdate', async (column) => {
      if (column.is_active === false) column.inactivedAt = moment.utc()
      if (column.is_deleted === true) column.deletedAt = moment.utc()
    })
  }
}

module.exports = ColumnModel

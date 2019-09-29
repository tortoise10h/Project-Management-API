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
    allowNull: false
  },
  color: {
    type: Sequelize.STRING(255),
    allowNull: false
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
  }
}

class LabelModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'label' }
    super(schema, sequelize, constant.DB_MODEL.LABEL, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    this.model.addHook('beforeUpdate', async (label) => {
      if (label.is_active === false) label.inactivedAt = moment.utc()
      if (label.is_deleted === true) label.deletedAt = moment.utc()
    })
  }
}

module.exports = LabelModel

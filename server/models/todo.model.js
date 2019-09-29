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
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  task_id: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING(100),
    allowNull: false,
    defaultValue: constant.TODO_STATUS.NEW
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

class TodoModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'todo' }
    super(schema, sequelize, constant.DB_MODEL.TODO, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    this.model.addHook('beforeUpdate', async (todo) => {
      if (todo.is_active === false) todo.inactivedAt = moment.utc()
      if (todo.is_deleted === true) todo.deletedAt = moment.utc()
    })
  }
}

module.exports = TodoModel

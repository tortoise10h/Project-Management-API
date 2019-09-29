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
  avatar_location: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  due_date: {
    type: Sequelize.DATE
  },
  column_id: {
    type: Sequelize.BIGINT(20),
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

class TaskModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'task' }
    super(schema, sequelize, constant.DB_MODEL.TASK, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    this.model.addHook('beforeUpdate', async (task) => {
      if (task.is_active === false) task.inactivedAt = moment.utc()
      if (task.is_deleted === true) task.deletedAt = moment.utc()
    })
  }
}

module.exports = TaskModel

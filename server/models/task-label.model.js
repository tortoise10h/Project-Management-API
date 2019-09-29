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
  task_id: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  label_id: {
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

class TaskLabelModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'task_label' }
    super(schema, sequelize, constant.DB_MODEL.TASK_LABEL, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    this.model.addHook('beforeUpdate', async (taskLabel) => {
      if (taskLabel.is_active === false) taskLabel.inactivedAt = moment.utc()
      if (taskLabel.is_deleted === true) taskLabel.deletedAt = moment.utc()
    })
  }
}

module.exports = TaskLabelModel

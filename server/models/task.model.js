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
  index: {
    type: Sequelize.INTEGER,
    allowNull: true
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
    await super.init()

    /** Sync model to database */
    await this.model.sync()

    /** Before update task */
    this.model.addHook('beforeUpdate', async (task) => {
      if (task.is_active === false) task.inactivedAt = moment.utc()
      if (task.is_deleted === true) task.deletedAt = moment.utc()
    })
    /** Before create task, generate task index */
    this.model.addHook('beforeCreate', async (task) => {
      const [last] = await this.model.findAll({
        where: { column_id: task.column_id },
        order: [['index', 'desc']],
        limit: 1
      })
      let index = 0
      if (last) index = last.index
      task.index = ++index
      return task
    })
  }
}

module.exports = TaskModel

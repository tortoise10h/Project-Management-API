const Sequelize = require('sequelize')
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
  start_date: {
    type: Sequelize.DATE
  },
  end_date: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue: 'New'
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  owner: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  inactivedAt: {
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE
  }
}

class ProjectModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'project' }
    super(schema, sequelize, constant.DB_MODEL.PROJECT, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()
  }
}

module.exports = ProjectModel

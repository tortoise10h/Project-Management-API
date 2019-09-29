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
  project_id: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  role: {
    type: Sequelize.STRING(100),
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

class UserProjectModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'user_project' }
    super(schema, sequelize, constant.DB_MODEL.USER_PROJECT, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    this.model.addHook('beforeUpdate', async (userProject) => {
      if (userProject.is_active === false) userProject.inactivedAt = moment.utc()
      if (userProject.is_deleted === true) userProject.deletedAt = moment.utc()
    })
  }
}

module.exports = UserProjectModel

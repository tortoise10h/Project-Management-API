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
  task_id: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  media_location: {
    type: Sequelize.TEXT,
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

class MediaModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'media' }
    super(schema, sequelize, constant.DB_MODEL.MEDIA, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    this.model.addHook('beforeUpdate', async (media) => {
      if (media.is_active === false) media.inactivedAt = moment.utc()
      if (media.is_deleted === true) media.deletedAt = moment.utc()
    })
  }
}

module.exports = MediaModel

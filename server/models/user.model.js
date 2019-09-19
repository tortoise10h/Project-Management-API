const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
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
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  photo_location: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING(255),
    allowNull: true,
    unique: true
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: true
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

class UserModel extends IModel {
  constructor (sequelize, options) {
    const modelOptions = { ...options, tableName: 'user' }
    super(schema, sequelize, constant.DB_MODEL.USER, modelOptions)
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)

    /** Sync model to database */
    await this.model.sync()

    /** Hash password before save database */
    this.model.addHook('beforeCreate', async (user) => {
      user.password = await bcrypt.hash(user.password, constant.PASSWORD_HASH_SALT_ROUNDS)
    })

    /** Hash password before update to database */
    this.model.addHook('beforeUpdate', async (user) => {
      user.password = await bcrypt.hash(user.password, constant.PASSWORD_HASH_SALT_ROUNDS)
      if (user.is_active === false) user.inactivedAt = moment.utc()
      if (user.is_deleted === true) user.deletedAt = moment.utc()
    })
  }
}

module.exports = UserModel

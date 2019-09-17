const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const moment = require('moment');
const IModel = require('./model.index');
const { constant } = require('../../common');

const schema = {
  id: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  username: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: true,
    unique: true,
  },
  lastlogin: {
    type: Sequelize.DATE,
  },
  lastip: {
    type: Sequelize.STRING(45),
  },
  role: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: constant.USER_ROLE.LOGINED_USER,
  },
  type: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: constant.USER_TYPE.PERSONAL,
  },
  added_by: {
    type: Sequelize.BIGINT(20),
  },
  is_active: { //  flag prevents users to log in, if = fasle
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  inactivedAt: {
    type: Sequelize.DATE,
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
};

class UserModel extends IModel {
  constructor(sequelize, options) {
    const modelOptions = { ...options, tableName: 'user' };
    super(schema, sequelize, constant.DB_MODEL.USER, modelOptions);
  }

  async init() {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options);

    /** Sync model to database */
    await this.model.sync();

    /** Hash password before save database */
    this.model.addHook('beforeCreate', async (user) => {
      user.password = await bcrypt.hash(user.password, constant.PASSWORD_HASH_SALT_ROUNDS);
    });

    /** Hash password before update to database */
    this.model.addHook('beforeUpdate', async (user) => {
      user.password = await bcrypt.hash(user.password, constant.PASSWORD_HASH_SALT_ROUNDS);
      if (user.is_active === false) user.inactivedAt = moment.utc();
      if (user.is_deleted === true) user.deletedAt = moment.utc();
    });
  }
}

module.exports = UserModel;

const Sequelize = require('sequelize');
const IModel = require('./model.index');
const { constant } = require('../../common');

const schema = {
  id: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  action: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userid: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
  },
  ip: {
    type: Sequelize.STRING(45),
    allowNull: true,
  },
  info: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  url: {
    type: Sequelize.STRING(100),
  },
};

class LogModel extends IModel {
  constructor(sequelize, options) {
    const modelOptions = { ...options, tableName: 'log' };
    super(schema, sequelize, constant.DB_MODEL.LOG, modelOptions);
  }
}

module.exports = LogModel;

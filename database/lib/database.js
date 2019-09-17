const Sequelize = require('sequelize');

// const { Op } = Sequelize;

// const operatorsAliases = {
//     $eq: Op.eq,
//     $ne: Op.ne,
//     $gte: Op.gte,
//     $gt: Op.gt,
//     $lte: Op.lte,
//     $lt: Op.lt,
//     $not: Op.not,
//     $in: Op.in,
//     $notIn: Op.notIn,
//     $is: Op.is,
//     $like: Op.like,
//     $notLike: Op.notLike,
//     $iLike: Op.iLike,
//     $notILike: Op.notILike,
//     $regexp: Op.regexp,
//     $notRegexp: Op.notRegexp,
//     $iRegexp: Op.iRegexp,
//     $notIRegexp: Op.notIRegexp,
//     $between: Op.between,
//     $notBetween: Op.notBetween,
//     $overlap: Op.overlap,
//     $contains: Op.contains,
//     $contained: Op.contained,
//     $adjacent: Op.adjacent,
//     $strictLeft: Op.strictLeft,
//     $strictRight: Op.strictRight,
//     $noExtendRight: Op.noExtendRight,
//     $noExtendLeft: Op.noExtendLeft,
//     $and: Op.and,
//     $or: Op.or,
//     $any: Op.any,
//     $all: Op.all,
//     $values: Op.values,
//     $col: Op.col,
// };

class Database {
  constructor(config, loggingFunction) {
    this.database = config.database;
    this.username = config.username;
    this.password = config.password;
    this.options = {
      host: config.host,
      port: config.port,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialect: 'mariadb',
      define: {
        timestamps: true,
        freezeTableName: true,
      },
      dialectOptions: {
        useUTC: false,
        timezone: config.timezone,
      },
      benchmark: false,
      logging: config.loggerEnable ? msg => loggingFunction(msg) : false,
      // operatorsAliases,
    };
    this.url = `${this.options.dialect}://${config.host}:${config.port}/${config.database}`;
  }

  async connect() {
    try {
      this.sequelize = new Sequelize(this.database, this.username, this.password, this.options);
      await this.sequelize.authenticate();
      logger.info(`[Database] MariaDB connected, url => ${this.url}`);
    } catch (error) {
      logger.error(`[Database] MariaDB connect error, url => ${this.url}`);
      throw error;
    }
  }

  getConnection() {
    return this.sequelize;
  }

  async sync() {
    await this.sequelize.sync();
    logger.info('[Database] Created not exists table schema');
  }

  async close() {
    await this.sequelize.close();
    logger.warn(`[Database] MariaDB disconnected, url => ${this.url}`);
  }
}

module.exports = Database;

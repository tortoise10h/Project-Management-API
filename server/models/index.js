const fs = require('fs')
const { constant, config } = require('../../common')

class ModelFactory {
  constructor () {
    this.products = {}
  }

  getModel (name) {
    return this.products[name]
  }

  getAllModels () {
    return this.products
  }

  getConnection () {
    return this.connection
  }

  async build (sequelize, options) {
    this.connection = sequelize
    const modelOptions = { underscore: true, ...options }
    const modelsList = fs.readdirSync(__dirname)
    const buildPromises = modelsList.filter(m => m.endsWith('.model.js')).map(async (modelFile) => {
      const ModelClass = require(`./${modelFile}`) // eslint-disable-line global-require
      const modelInstance = new ModelClass(this.connection, modelOptions)
      this.products[modelInstance.modelName] = await modelInstance.getInstance()
    })

    await Promise.all(buildPromises)
    await this.buildAssociation()
    await this.buildDefaultData()
  }

  async buildAssociation () {
    const {
      User, Project, Task, Log, Media, Todo, Label, Column,
      UserTask, UserProject, TaskLabel, UserLog
    } = this.products

    /** User & Everyone */
    // User.hasMany(Project, { foreignKey: 'owner', targetKey: 'id' })
    // User.hasMany(Task, { foreignKey: 'created_by', targetKey: 'id' })
    User.hasMany(Log, { foreignKey: 'user_id', targetKey: 'id' })
    User.hasMany(Label, { foreignKey: 'created_by', targetKey: 'id' })
    User.hasMany(Media, { foreignKey: 'created_by', targetKey: 'id' })
    User.hasMany(Todo, { foreignKey: 'created_by', targetKey: 'id' })

    /** Project & User */
    Project.hasMany(UserProject, { foreignKey: 'project_id', sourceKey: 'id' })
    User.hasMany(UserProject, { foreignKey: 'user_id', sourceKey: 'id' })
    UserProject.belongsTo(Project, { foreignKey: 'project_id', targetKey: 'id' })
    UserProject.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' })
    User.belongsToMany(Project, { through: UserProject, foreignKey: 'user_id' })
    Project.belongsToMany(User, { through: UserProject, foreignKey: 'project_id' })

    /** User & Task */
    Task.hasMany(UserTask, { foreignKey: 'task_id', sourceKey: 'id' })
    User.hasMany(UserTask, { foreignKey: 'user_id', sourceKey: 'id' })
    UserTask.belongsTo(Task, { foreignKey: 'task_id', targetKey: 'id' })
    UserTask.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' })
    User.belongsToMany(Task, { through: UserTask, foreignKey: 'user_id' })
    Task.belongsToMany(User, { through: UserTask, foreignKey: 'task_id' })

    /** Log & User */
    Log.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' })

    /** Log & Project */
    Project.hasMany(Log, { foreignKey: 'project_id', sourceKey: 'id' })
    Log.belongsTo(Project, { foreignKey: 'project_id', targetKey: 'id' })

    /** Project & Column */
    Project.hasMany(Column, { foreignKey: 'project_id', sourceKey: 'id' })
    Column.belongsTo(Project, { foreignKey: 'project_id', targetKey: 'id' })

    /** Project & Label */
    Project.hasMany(Label, { foreignKey: 'project_id', sourceKey: 'id' })
    Label.belongsTo(Project, { foreignKey: 'project_id', targetKey: 'id' })

    /** Column & Task */
    Column.hasMany(Task, { foreignKey: 'column_id', sourceKey: 'id' })
    Task.belongsTo(Column, { foreignKey: 'column_id', targetKey: 'id' })

    /** Task & Media */
    Task.hasMany(Media, { foreignKey: 'task_id', sourceKey: 'id' })
    Media.belongsTo(Task, { foreignKey: 'task_id', targetKey: 'id' })

    /** Task & Todo */
    Task.hasMany(Todo, { foreignKey: 'task_id', sourceKey: 'id' })
    Todo.belongsTo(Task, { foreignKey: 'task_id', targetKey: 'id' })

    /** Task & Label */
    Task.hasMany(TaskLabel, { foreignKey: 'task_id', sourceKey: 'id' })
    Label.hasMany(TaskLabel, { foreignKey: 'label_id', sourceKey: 'id' })
    TaskLabel.belongsTo(Task, { foreignKey: 'task_id', targetKey: 'id' })
    TaskLabel.belongsTo(Label, { foreignKey: 'label_id', targetKey: 'id' })
    Label.belongsToMany(Task, { through: TaskLabel, foreignKey: 'label_id' })
    Task.belongsToMany(Label, { through: TaskLabel, foreignKey: 'task_id' })
  }

  async buildDefaultData () {
    const { User } = this.products

    /** Create default account */
    await User.findOrCreate({
      where: { email: 'tortoise10h@gmail.com' },
      defaults: {
        password: '12345678',
        confirm: true,
        name: 'Nguyễn Tấn Huy',
        phone: '0397097276'
      }
    })

    await User.findOrCreate({
      where: { email: 'guest@gmail.com' },
      defaults: {
        password: '12345678',
        confirm: true,
        name: 'Guest Name',
        phone: '0999999999'
      }
    })
  }
}

module.exports = new ModelFactory()

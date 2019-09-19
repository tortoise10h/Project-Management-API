class IModel {
  constructor (schema, sequelize, modelName, options) {
    this.sequelize = sequelize
    this.modelName = modelName
    this.schema = schema
    this.options = options
  }

  async init () {
    this.model = this.sequelize.define(this.modelName, this.schema, this.options)
    await this.model.sync()
  }

  async getInstance () {
    if (!this.model) await this.init()
    return this.model
  }
}

module.exports = IModel

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

  }

  async buildDefaultData () {
  }
}

module.exports = new ModelFactory()

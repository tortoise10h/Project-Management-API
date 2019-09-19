const Sequelize = require('sequelize')

const { Op } = Sequelize

class QueryParser {
  constructor () {
    this.operators = {
      '=': Op.eq,
      '>': Op.gt,
      '<': Op.lt,
      '>=': Op.gte,
      '<=': Op.lte,
      '!=': Op.ne,
      like: Op.like,
      notLike: Op.notLike,
      in: Op.in,
      notIn: Op.notIn,
      between: Op.between,
      notBetween: Op.notBetween,
      startsWith: Op.startsWith,
      endsWith: Op.endsWith,
      substring: Op.substring
    }
  }

  mapCriteriaToSequelize (searchJoin, input, model) {
    if (searchJoin === 'or') {
      return {
        [Op.or]: input.map((item) => {
          if (!this.operators[item.type]) {
            return null
          }
          if (['like', 'notLike'].includes(item.type)) {
            item.value = `%${item.value}%`
          }
          return {
            [this.operators[item.type]]: this.mapFieldToValue({
              key: item.key,
              subKey: item.subKey,
              value: item.value,
              model,
              operator: item.type
            })
          }
        }).filter(item => item)
      }
    }
    return input.reduce((all, item) => {
      if (!this.operators[item.type]) {
        return all
      }
      if (['like', 'notLike'].includes(item.type)) {
        item.value = `%${item.value}%`
      }
      return {
        ...all,
        [item.key]: {
          [this.operators[item.type]]: this.mapFieldToValue({
            key: item.key,
            subKey: item.subKey,
            value: item.value,
            model,
            operator: item.type
          })
        }
      }
    }, {})
  }

  mapTypeToValue (type, value) {
    if (value === '_NULL_') {
      return null
    }
    switch (type) {
      case 'INTEGER':
        return parseInt(value)
      case 'DATE':
        return new Date(value)
      default:
        return value
    }
  }

  mapFieldToValue ({
    key,
    subKey,
    value,
    model,
    operator
  }) {
    let type = ''
    if (key && !subKey && model.tableAttributes[key]) {
      type = model.tableAttributes[key].type.constructor.key
    } else if (
      subKey &&
            model.associationModels &&
            model.associationModels[subKey].tableAttributes[key]
    ) {
      type = model.associationModels[subKey].tableAttributes[key].type.constructor.key
    }
    if (['in', 'notIn'].includes(operator)) {
      const values = value.split(',')
      return values.map(item => this.mapTypeToValue(type, item))
    } if (['between', 'notBetween'].includes(operator)) {
      const values = value.split(',')
      return [0, 1].map(item => this.mapTypeToValue(type, values[item]))
    }
    return this.mapTypeToValue(type, value)
  }

  parseIncludes (includes, subCriterias, model) {
    return includes.map((item) => {
      if (!subCriterias[item]) {
        return item
      }
      const values = subCriterias[item]
      return {
        association: item,
        where: this.mapCriteriaToSequelize('and', values, model)
      }
    })
  }

  filter (req = {}, model) {
    const {
      query = {
        search: '',
        searchFields: '',
        searchJoin: '',
        includes: undefined,
        page: undefined,
        offset: undefined,
        sort: undefined,
        direction: undefined
      }
    } = req
    try {
      const parsedSearch = query.search ? `${query.search}`.split(';') : []
      const parsedQuery = query.searchFields ? `${query.searchFields}`.split(';') : []
      const criterias = []
      const subCriterias = {}
      const searchFields = {}
      let includes
      if (parsedQuery.length) {
        parsedQuery.forEach((item) => {
          const values = `${item}`.split(':')
          if (values.length === 2) {
            const [_f, _v] = values
            searchFields[_f] = _v
          }
        })
      }
      if (parsedSearch.length) {
        parsedSearch.forEach((item) => {
          const values = item.split(':')
          if (values.length === 2) {
            const splitedFields = values[0].split('.')
            const field = splitedFields.length > 1
              ? splitedFields[splitedFields.length - 1]
              : values[0]
            if (splitedFields.length === 1) {
              criterias.push({
                key: values[0],
                value: values[1],
                type: searchFields[values[0]] || '='
              })
            } else {
              if (!subCriterias[splitedFields[0]]) {
                subCriterias[splitedFields[0]] = []
              }
              subCriterias[splitedFields[0]].push({
                key: field,
                subKey: splitedFields[0],
                value: values[1],
                type: searchFields[values[0]] || '='
              })
            }
          }
        })
      }
      if (query.includes) {
        const parsedIncludes = `${query.includes}`.split(';')
        if (parsedIncludes.length) {
          includes = this.parseIncludes(parsedIncludes, subCriterias, model)
        }
      }
      const results = {
        include: includes || undefined,
        where: this.mapCriteriaToSequelize(query.searchJoin || 'and', criterias, model),
        page: query.page ? +query.page : undefined,
        limit: query.offset ? +query.offset : undefined,
        order: query.sort ? [[query.sort, query.direction || 'DESC']] : undefined
      }
      const filters = Object.keys(results).reduce((all, key) => {
        if (!results[key]) {
          return all
        }
        return { ...all, [key]: results[key] }
      }, {})
      return filters
    } catch (err) {
      logger.error(`QueryParser::filter::error: ${err}`)
      throw err
    }
  }
}

module.exports = new QueryParser()

const { Op } = require('sequelize');

const checkFieldsDuplicate = async (model, fieldsValidate, modelId) => {
  const errors = [];
  const keysUpdate = [];
  const valueArr = [];
  Object.keys(fieldsValidate).forEach((key) => {
    if (fieldsValidate[key]) {
      const conditon = {};
      conditon[key] = fieldsValidate[key];
      keysUpdate.push(conditon);
      valueArr.push(fieldsValidate[key]);
    }
  });

  const where = { [Op.or]: keysUpdate };
  if (modelId) where.id = { [Op.ne]: modelId };

  const customerDuplicationInfo = await model.findAll({ where });
  if (customerDuplicationInfo) {
    customerDuplicationInfo.forEach((value) => {
      value = value.toJSON();
      Object.keys(value).forEach((val) => {
        if (valueArr.includes(value[val])) {
          errors.push({ field: val, value: value[val], message: `Field ${val} must be uniqued` });
        }
      });
    });
  }

  return errors;
};

module.exports = checkFieldsDuplicate;

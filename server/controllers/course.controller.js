const httpStatus = require('http-status');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const fs = require('fs');
const { Op } = require('sequelize');
const uuid = require('uuid');
const { APIError, apiResponse } = require('../helpers');
const { constant, util } = require('../../common');
const { queryParser } = require('../lib');
const modelFactory = require('../models');
const certificateController = require('./certificate.controller');

const getCurriculum = (courseId, unitsData) => {
  if (unitsData.length > 0) {
    let maxLevelInDB = unitsData[unitsData.length - 1].level;
    const minLevel = unitsData[0].level;
    const dataGroupByLevel = _.groupBy(unitsData, 'level');
    while (maxLevelInDB > minLevel) {
      const maxLevelRow = dataGroupByLevel[`${maxLevelInDB}`];
      const parentMaxLevelRow = dataGroupByLevel[`${maxLevelInDB - 1}`];
      for (let i = 0; i < maxLevelRow.length; i++) {
        for (let j = 0; j < parentMaxLevelRow.length; j++) {
          if (parentMaxLevelRow[j].id === maxLevelRow[i].parent_id) {
            if (_.isArray(parentMaxLevelRow[j].childs)) {
              parentMaxLevelRow[j].childs.push(maxLevelRow[i]);
            } else {
              parentMaxLevelRow[j].childs = [maxLevelRow[i]];
            }
            break;
          }
        }
      }
      maxLevelInDB--;
    }
    return dataGroupByLevel[`${minLevel}`];
  }
  return [];
};

const validateCourseUnits = async (curriculumInfo, author) => {
  try {
    const schema = Joi.array().required().min(1).items(
      Joi.object().keys({
        index: Joi.number().required().min(0).default(0),
        title: Joi.string().required().max(255),
        homework: Joi.string().optional(),
        level: Joi.number().required().min(0).default(0),
        parent_id: Joi.alternatives().when('level', {
          is: 0,
          then: Joi.string().required().only(''),
          otherwise: Joi.string().required(),
        }),
        type: Joi.string().optional().valid(Object.values(constant.COURSE_UNIT_TYPE)),
        summary: Joi.string().optional(),
        duration: Joi.number().optional().min(1),
      }),
    );
    /** Validate input */
    const validater = Joi.validate(curriculumInfo, schema, { abortEarly: false });
    if (validater.error) return [new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST)];

    const units = validater.value;

    const unitsData = units.map(unit => ({
      ...unit,
      added_by: author.id,
    }));
    return [null, unitsData];
  } catch (error) {
    return [error];
  }
};

const removeImageWhenAddCourseFailed = (files) => {
  if (files) {
    Object.keys(files).forEach((key) => {
      fs.unlink(files[key][0].path, () => {});
    });
  }
};

class CourseController {
  async listCourse(req, res, next) {
    try {
      const schema = Joi.object().keys({
        code: Joi.string().optional().max(20).regex(/^[a-zA-Z0-9_.-]*$/),
        name: Joi.string().optional().max(255),
        detail: Joi.string().optional(),
        total_sessions: Joi.number().optional(),
        session_duration: Joi.number().optional(),
        session_duration_in: Joi.string().optional().valid('second', 'minute', 'hour', 'day', 'month'),
        price: Joi.number().optional(),
        type_cost: Joi.number().optional(),
        fee_currency: Joi.string().optional(),
        is_active: Joi.boolean().optional(),
        excerpt: Joi.string().optional(),
        course_category_ids: Joi.array().items(Joi.number().min(1)),
        sort: Joi.string().optional().default('name'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC'),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
      });

      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));
      const {
        sort, direction, page, offset,
        course_category_ids: courseCategoryIds,
      } = validater.value;

      /** Map filter */
      const condition = {};
      Object.keys(validater.value).forEach((key) => {
        if (!['page', 'offset', 'sort', 'direction', 'course_category_ids'].includes(key)) {
          switch (typeof validater.value[key]) {
            case 'string':
              condition[key] = { [Op.like]: `%${validater.value[key]}%` };
              break;
            case 'boolean':
            case 'number':
              condition[key] = validater.value[key];
              break;
            case 'object': {
              if (validater.value[key] instanceof Date) {
                condition[key] = validater.value[key];
              }
              break;
            }
            default:
              break;
          }
        }
      });

      if (courseCategoryIds) condition.course_category_id = { [Op.in]: courseCategoryIds };

      /** Get list of category */
      const { Course, CourseCategory, CertificateType } = modelFactory.getAllModels();

      const queryOffset = (page - 1) * offset;
      const queryLimit = offset;

      const courses = await Course.findAndCountAll({
        where: condition,
        include: [CourseCategory, CertificateType],
        order: [[sort, direction]],
        offset: queryOffset,
        limit: queryLimit,
      });

      return apiResponse.success(res, util.paginate(courses, page, offset));
    } catch (error) {
      return next(error);
    }
  }

  async addCourse(req, res, next) {
    try {
      const schema = Joi.object().keys({
        code: Joi.string().required().max(20).regex(/^[a-zA-Z0-9_.-]*$/),
        name: Joi.string().required().max(255),
        detail: Joi.string().optional(),
        total_sessions: Joi.number().required(),
        session_duration: Joi.number().required(),
        session_duration_in: Joi.string().required().valid('second', 'minute', 'hour'),
        fee_currency: Joi.string().required(),
        price: Joi.number().required(),
        excerpt: Joi.string().optional(),
        course_for: Joi.string().optional(),
        career_path: Joi.string().optional(),
        type_cost: Joi.number().required().valid(Object.values(constant.COURSE_TYPE_COST)),
        is_active: Joi.boolean().optional().default(true),
        course_category_id: Joi.number().required(),
        certificate_type_info: Joi.object().optional(),
        curriculum_info: Joi.array().optional(),
      });
      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false });
      if (validater.error) {
        removeImageWhenAddCourseFailed(req.files);
        return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));
      }
      const {
        code, course_category_id: categoryId,
        certificate_type_info: certificateTypeInfo,
        curriculum_info: curriculumInfo,
      } = validater.value;

      /** Validate reference info */
      const {
        Course, CourseCategory, CertificateType, CourseUnit,
      } = modelFactory.getAllModels();
      const errors = [];

      /** Validate is exists category */
      const category = await CourseCategory.findByPk(categoryId);
      if (!category || !category.is_active || category.is_deleted) {
        errors.push(
          {
            name: 'course', field: 'course_category_id', value: categoryId, message: 'Invalid category',
          },
        );
      }

      /** Validate duplicate code */
      const oldCourse = await Course.findOne({ where: { code } });
      if (oldCourse) {
        errors.push(
          {
            name: 'course', field: 'code', value: code, message: 'Code is already existed',
          },
        );
      }

      /** If happend any error above remove image was added and return errors */
      if (errors.length > 0) {
        removeImageWhenAddCourseFailed(req.files);
        return next(new APIError(errors, httpStatus.BAD_REQUEST));
      }

      const courseInfo = {
        ...validater.value,
        added_by: req.author.id,
      };

      /** Validate certificate type info if have return an error and remove image was added */
      let certificateType;
      let certificateTypeError;
      if (certificateTypeInfo) {
        [certificateTypeError, certificateType] = await certificateController.validateCertificateType(certificateTypeInfo, req.author);
        if (certificateTypeError) {
          removeImageWhenAddCourseFailed(req.files);
          return next(certificateTypeError);
        }
      }

      /** Validate course units if have return an error and remove image was added */
      let courseUnitsError;
      let unitsData;
      if (curriculumInfo) {
        [courseUnitsError, unitsData] = await validateCourseUnits(curriculumInfo, req.author);
        if (courseUnitsError) {
          removeImageWhenAddCourseFailed(req.files);
          return next(courseUnitsError);
        }
      }

      /** Add course photo link if have */
      if (req.files) {
        Object.keys(req.files).forEach((key) => {
          if (key === 'avatar') courseInfo.avatar_location = req.files[key][0].path;
          else if (key === 'trailer') courseInfo.trailer_location = req.files[key][0].path;
        });
      }

      /** Add new course */
      const sequelize = modelFactory.getConnection();
      const result = await sequelize.transaction(async (t) => {
        const course = await Course.create(courseInfo, { transaction: t });
        if (certificateType) {
          certificateType.course_id = course.id;
          await CertificateType.create(certificateType, { transaction: t });
        }
        if (unitsData) {
          unitsData = unitsData.map(unit => ({
            id: `${course.id}-${uuid.v1()}`,
            ...unit,
            course_id: course.id,
          }));
          await CourseUnit.bulkCreate(unitsData, { transaction: t });
        }
        return course;
      });
      return apiResponse.success(res, result);
    } catch (error) {
      return next(error);
    }
  }

  async loadCourse(req, res, next, courseId) {
    try {
      /** Validate input */
      const id = parseInt(courseId);
      if (_.isNaN(id)) return next(new APIError([{ field: 'courseId', value: courseId, message: 'Invalid course id' }], httpStatus.BAD_REQUEST));

      /** Validate existed */
      const {
        Course, CourseCategory,
      } = modelFactory.getAllModels();

      const course = await Course.findByPk(id, { include: [CourseCategory] });
      if (!course || course.is_deleted) return next(new APIError('Course not found', httpStatus.NOT_FOUND));

      /** Load role to query, pass to next step */
      req.course = course;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getCourse(req, res, next) {
    try {
      return apiResponse.success(res, req.course);
    } catch (error) {
      return next(error);
    }
  }

  async updateCourse(req, res, next) {
    try {
      const schema = Joi.object().keys({
        code: Joi.string().optional().max(255),
        name: Joi.string().optional().max(255),
        detail: Joi.string().optional(),
        course_for: Joi.string().optional(),
        career_path: Joi.string().optional(),
        total_sessions: Joi.number().optional().min(0),
        excerpt: Joi.string().optional(),
        session_duration: Joi.number().optional(),
        session_duration_in: Joi.string().optional().valid('second', 'minute', 'hour', 'day', 'month'),
        price: Joi.number().optional().min(0),
        type_cost: Joi.number().optional().valid(Object.values(constant.COURSE_TYPE_COST)),
        fee_currency: Joi.string().optional(),
        is_active: Joi.boolean().optional(),
        course_category_id: Joi.number().optional(),
      });
      const errors = [];
      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false });
      if (validater.error) {
        removeImageWhenAddCourseFailed(req.files);
        return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));
      }
      const { code, course_category_id: categoryId } = validater.value;
      const { course } = req;
      const updateInfo = { ...validater.value };

      /** Validate reference info */
      const { Course, CourseCategory } = modelFactory.getAllModels();

      /** Validate exists and active category */
      if (categoryId) {
        const category = await CourseCategory.findByPk(categoryId);
        if (!category || category.is_deleted || !category.is_active) errors.push({ field: 'course_category_id', value: categoryId, message: 'Invalid category' });
      }

      /** Validate duplicate code */
      if (code) {
        const oldCourse = await Course.findOne({
          where: {
            code,
            id: {
              [Op.ne]: course.id,
            },
          },
        });
        if (oldCourse) errors.push({ field: 'code', value: code, message: 'Invalid code' });
      }

      if (errors.length > 0) {
        removeImageWhenAddCourseFailed(req.files);
        return next(new APIError(errors, httpStatus.BAD_REQUEST));
      }

      /** Update photo of course */
      const oldAvatarLocation = course.avatar_location;
      const oldTrailerLocation = course.trailer_location;

      /** Add course photo link if have */
      if (req.files) {
        Object.keys(req.files).forEach((key) => {
          if (key === 'avatar') updateInfo.avatar_location = req.files[key][0].path;
          else if (key === 'trailer') updateInfo.trailer_location = req.files[key][0].path;
        });
      }

      /** Delete old file */
      if (oldAvatarLocation && updateInfo.avatar_location) {
        fs.unlink(oldAvatarLocation, () => {});
      }
      if (oldTrailerLocation && updateInfo.trailer_location) {
        fs.unlink(oldTrailerLocation, () => {});
      }

      /** Update course */
      const updatedCourse = await course.update({ ...updateInfo });
      return apiResponse.success(res, updatedCourse);
    } catch (error) {
      return next(error);
    }
  }

  async updateCoursePhoto(req, res, next) {
    try {
      const { course } = req;
      /** Update photo of course */
      const oldPhotoLocation = course.photo_location;
      let newPhotoLocation;
      if (req.file) newPhotoLocation = req.file.path;

      /** Update new student photo location */
      await course.update({ photo_location: newPhotoLocation });

      /** Delete old photo */
      if (oldPhotoLocation) {
        fs.unlinkSync(oldPhotoLocation);
      }

      return apiResponse.success(res, newPhotoLocation);
    } catch (error) {
      return next(error);
    }
  }

  async deleteCourse(req, res, next) {
    return next(new APIError('Under construction', httpStatus.NOT_IMPLEMENTED));
  }

  async searchCourseV1(req, res, next) {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().optional().max(255),
        course_category_id: Joi.number().required(),
      });

      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));

      /** Map search */
      const search = {
        name: { [Op.like]: `%${validater.value.name}%` },
        course_category_id: validater.value.course_category_id,
      };

      const Course = modelFactory.getModel(constant.DB_MODEL.COURSE);
      const courses = await Course.findAndCountAll({
        where: search,
      });

      return apiResponse.success(res, util.paginate(courses));
    } catch (error) {
      return next(error);
    }
  }

  async searchCourse(req, res, next) {
    try {
      const schema = Joi.object().keys({
        search: Joi.string().optional(),
        searchFields: Joi.string().optional(),
        searchJoin: Joi.string().optional(),
        includes: Joi.string().optional(),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
        sort: Joi.string().optional().default('id'),
        direction: Joi.string().optional().uppercase().valid(['ASC', 'DESC'])
          .default('ASC'),
      });

      const validater = Joi.validate(req.query, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));
      const { page, offset } = validater.value;
      const Course = modelFactory.getModel(constant.DB_MODEL.COURSE);
      const query = queryParser.filter(req, Course);

      const data = await Course.findAndCountAll(query);

      return apiResponse.success(res, util.paginate(data, page, offset));
    } catch (error) {
      return next(error);
    }
  }

  async getListRegistrationOfCourse(req, res, next) {
    try {
      const schema = Joi.object().keys({
        message: Joi.string().optional().max(255),
        registration_status: Joi.string().optional().valid(Object.values(constant.REGISTRATION_STATUS)),
        customer_name: Joi.string().optional().max(255),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
      });

      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));
      const {
        message, page, offset, customer_name: customerName, registration_status: registrationStatus,
      } = validater.value;

      const { Registration, Customer } = modelFactory.getAllModels();
      const { course } = req;

      /** Map search */
      let conditions = {
        is_deleted: false,
        course_id: course.id,
      };

      if (message && message.length > 0) {
        conditions = {
          ...conditions,
          message: { [Op.like]: `%${message}%` },
          course_category_id: validater.value.course_category_id,
        };
      }

      if (!_.isNil(registrationStatus)) {
        conditions = {
          ...conditions,
          status: registrationStatus,
        };
      }

      let queryExt = {};
      if (customerName && customerName.length > 0) {
        queryExt = {
          where: {
            name: { [Op.like]: `%${customerName}%` },
          },
        };
      }

      const queryOffset = (page - 1) * offset;
      const queryLimit = offset;

      const registrations = await Registration.findAndCountAll({
        where: { ...conditions },
        include: [{
          model: Customer,
          attributes: ['name'],
          ...queryExt,
        }],
        offset: queryOffset,
        limit: queryLimit,
      });

      return apiResponse.success(res, util.paginate(registrations, page, offset));
    } catch (error) {
      return next(error);
    }
  }

  async getListClassOfCourse(req, res, next) {
    try {
      const schema = Joi.object().keys({
        class_status: Joi.string().optional().valid(Object.values(constant.CLASS_STATUS)),
        page: Joi.number().optional().min(1).default(1),
        offset: Joi.number().optional().min(1).max(constant.SERVER.API_MAX_OFFSET)
          .default(constant.SERVER.API_DEFAULT_OFFSET),
      });

      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));
      const {
        page, offset, class_status: classStatus,
      } = validater.value;

      const Class = modelFactory.getModel(constant.DB_MODEL.CLASS);
      const { course } = req;

      /** Map search */
      let conditions = {
        is_deleted: false,
        course_id: course.id,
      };


      if (!_.isNil(classStatus)) {
        conditions = {
          ...conditions,
          status: classStatus,
        };
      }

      const queryOffset = (page - 1) * offset;
      const queryLimit = offset;

      const classes = await Class.findAndCountAll({
        where: { ...conditions },
        offset: queryOffset,
        limit: queryLimit,
      });

      return apiResponse.success(res, util.paginate(classes, page, offset));
    } catch (error) {
      return next(error);
    }
  }

  async getCurriculumOfCourse(req, res, next) {
    try {
      const schema = Joi.object().keys({
        max_level: Joi.number().optional().min(1),
      });

      /** Validate input */
      const validater = Joi.validate(req.query, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));

      const {
        max_level: maxLevel,
      } = validater.value;


      const CourseUnit = modelFactory.getModel(constant.DB_MODEL.COURSE_UNIT);
      const { id: courseId } = req.course;

      const condition = {
        course_id: courseId,
        is_deleted: false,
        is_visible: true,
      };

      if (maxLevel) {
        if (!_.isNumber(maxLevel)) {
          condition.level = {
            [Op.gte]: maxLevel - 1,
          };
        }
      }
      const units = await CourseUnit.findAndCountAll({
        order: [
          ['level', 'ASC'],
          ['index', 'ASC'],
        ],
        where: {
          ...condition,
        },
      });

      const unitsData = units.rows.map(unit => unit.toJSON());
      const curriculum = getCurriculum(courseId, unitsData);

      return apiResponse.success(res, curriculum);
    } catch (error) {
      return next(error);
    }
  }

  async loadCourseUnit(req, res, next, courseUnitId) {
    /** Validate existed */
    const CourseUnit = modelFactory.getModel(constant.DB_MODEL.COURSE_UNIT);
    const courseUnit = await CourseUnit.findByPk(courseUnitId);
    if (!courseUnit || courseUnit.is_deleted) return next(new APIError('Course unit not found', httpStatus.NOT_FOUND));

    /** Load role to query, pass to next step */
    req.courseUnit = courseUnit;
    return next();
  }

  async addCurriculumToCourse(req, res, next) {
    try {
      // eslint-disable-next-line prefer-const
      let [error, unitsData] = await validateCourseUnits(req.body, req.author);
      if (error) return next(error);
      const { CourseUnit, Course } = modelFactory.getAllModels();
      /** Get course to compare course unit session index with total session of course */
      const course = await Course.findByPk(req.course.id);

      const successList = [];
      const errorList = [];
      unitsData.forEach((unit) => {
        if (unit.index > course.total_sessions) {
          /** If number of course unit greater than total session of course */
          errorList.push({
            ...unit,
            message: 'Number of course unit overflow course total sessions',
          });
        } else {
          /** If number of course unit still less than total session of course */
          successList.push({
            id: `${req.course.id}-${uuid.v1()}`,
            ...unit,
            course_id: req.course.id,
          });
        }
      });
      await CourseUnit.bulkCreate(successList);
      return apiResponse.success(res, { success_list: successList, error_list: errorList });
    } catch (error) {
      return next(error);
    }
  }

  async updateCourseUnit(req, res, next) {
    try {
      const schema = Joi.object().keys({
        index: Joi.number().optional().min(0),
        title: Joi.string().optional().max(255),
        homework: Joi.string().optional(),
        level: Joi.number().optional().min(0),
        parent_id: Joi.string().optional(),
        type: Joi.string().optional().valid(Object.values(constant.COURSE_UNIT_TYPE)),
        summary: Joi.string().optional(),
        duration: Joi.number().optional(),
      });

      /** Validate input */
      const validater = Joi.validate(req.body, schema, { abortEarly: false });
      if (validater.error) return next(new APIError(util.collectError(validater.error.details), httpStatus.BAD_REQUEST));
      const { courseUnit } = req;
      const unit = await courseUnit.update({ ...validater.value });
      return apiResponse.success(res, unit);
    } catch (error) {
      return next(error);
    }
  }

  async deleteCourseUnit(req, res, next) {
    try {
      const { courseUnit } = req;
      if (courseUnit.is_deleted) return next(new APIError('Course unit is already deleted', httpStatus.BAD_REQUEST));

      await courseUnit.update({ is_deleted: true });
      return apiResponse.success(res, { is_deleted: true });
    } catch (error) {
      return next(error);
    }
  }

  async listAvailableSessionIndex(req, res, next) {
    try {
      const { course } = req;
      const CourseUnit = modelFactory.getModel(constant.DB_MODEL.COURSE_UNIT);
      const courseUnits = await CourseUnit.findAll({
        where: { course_id: course.id, is_deleted: false },
        attributes: ['index'],
        order: [['index', 'asc']],
      });
      const sessionsAreTaken = courseUnits.map(unit => unit.index);
      /** Make array of index follow by all session of course */
      const arrAllIndex = [];
      for (let i = 1; i <= course.total_sessions; i++) arrAllIndex.push(i);
      /** Filter to get available sesison */
      const availableSessions = _.difference(arrAllIndex, sessionsAreTaken);
      return apiResponse.success(res, availableSessions);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new CourseController();

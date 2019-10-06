const multer = require('multer')
const moment = require('moment')
const { config, util } = require('../../common')

const baseLocation = `${config.getServerConfig().uploadLocation}/project_management_${config.global.env}`
const upload = {}

/** Filter list */
const filter = {
  image: (req, file, cb) => {
    if (file.mimetype.split('/')[0] !== 'image') {
      return cb(new Error('Only image files are allowed'), false)
    }
    return cb(null, true)
  },
  course: (req, file, cb) => {
    const allowTypes = [
      'video/mp4',
      'application/mp4'
    ]
    if (!allowTypes.includes(file.mimetype) && file.mimetype.split('/')[0] !== 'image') {
      return cb(new Error('Only image and mp4 files are allowed'), false)
    }
    switch (file.fieldname) {
      case 'avatar': {
        if (file.mimetype.split('/')[0] !== 'image') {
          return cb(new Error('At course "avatar", only image is allowed'), false)
        }
        break
      }
      case 'trailer': {
        if (!allowTypes.includes(file.mimetype)) {
          return cb(new Error('At course "trailer", Only mp4 file is allowed'), false)
        }
        break
      }
      default: break
    }
    return cb(null, true)
  },
  excel: (req, file, cb) => {
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
      return cb(new Error('Wrong extension type'))
    }
    return cb(null, true)
  },
  video: (req, file, cb) => {
    const allowTypes = [
      'video/mp4',
      'application/mp4'
    ]
    if (!allowTypes.includes(file.mimetype)) {
      return cb(new Error('Only mp4 file are allowed'), false)
    }
    return cb(null, true)
  },
  document: (req, file, cb) => {
    const alowType = [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/x-rar-compressed'
    ]
    if (!alowType.includes(file.mimetype)) {
      return cb(new Error('Only .docx .doc .pdf .ppt .pptx .zip .rar files are allowed'), false)
    }
    return cb(null, true)
  },
  photo_location: (req, file, cb) => {
    const alowType = [
      'image/png',
      'image/jpeg',
      'image/svg+xml'
    ]
    if (!alowType.includes(file.mimetype)) {
      return cb(new Error('Only .png .jpg .jpeg .svg files are allowed'), false)
    }
    return cb(null, true)
  }
}

/** User avatar */
upload.userAvatar = (req, res, next) => {
  const location = `${baseLocation}/user/avatar`
  util.createFolder(location)
  const storage = multer.diskStorage({
    destination: (_req, _file, _cb) => {
      _cb(null, location)
    },
    filename: (_req, _file, _cb) => {
      _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`)
    }
  })
  const userAvatarUpload = multer({ storage, fileFilter: filter.image }).single('avatar')
  userAvatarUpload(req, res, (error) => {
    if (error instanceof multer.MulterError) return next(error)
    if (error) return next(error)
    return next()
  })
}

upload.customerPhoto = (req, res, next) => {
  const location = `${baseLocation}/customer/photo`
  util.createFolder(location)
  const storage = multer.diskStorage({
    destination: (_req, _file, _cb) => {
      _cb(null, location)
    },
    filename: (_req, _file, _cb) => {
      _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`)
    }
  })
  const customerPhotoUpload = multer({ storage, fileFilter: filter.image }).single('photo')
  customerPhotoUpload(req, res, (error) => {
    if (error instanceof multer.MulterError) return next(error)
    if (error) return next(error)
    return next()
  })
}

/** Course photo icon */
// upload.coursePhoto = (req, res, next) => {
//     const location = `${baseLocation}/course/photo`;
//     const certificateLocation = `${baseLocation}/certificate-type/certificate-photo`;
//     util.createFolder(location);
//     const storage = multer.diskStorage({
//         destination: (_req, _file, _cb) => {
//             if (_file.fieldname === 'photo') {
//                 _cb(null, location);
//             }
//             if (_file.fieldname === 'certificate-photo') {
//                 _cb(null, certificateLocation);
//             }
//         },
//         filename: (_req, _file, _cb) => {
//             _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`);
//         },
//     });
//     const coursePhotoUpload = multer({ storage, fileFilter: filter.image }).fields([
//         { name: 'photo', maxCount: 1 },
//         { name: 'certificate-photo', maxCounat: 1 },
//     ]);
//     coursePhotoUpload(req, res, (error) => {
//         if (error instanceof multer.MulterError) return next(error);
//         if (error) return next(error);
//         return next();
//     });
// };

/** Course photo */
upload.coursePhoto = (req, res, next) => {
  const avatarLocation = `${baseLocation}/course/photo`
  const trailerLocation = `${baseLocation}/course/trailer`
  util.createFolder(avatarLocation)
  const storage = multer.diskStorage({
    destination: (_req, _file, _cb) => {
      if (_file.fieldname === 'avatar') {
        _cb(null, avatarLocation)
      }
      if (_file.fieldname === 'trailer') {
        _cb(null, trailerLocation)
      }
    },
    filename: (_req, _file, _cb) => {
      _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`)
    }
  })
  const coursePhotoUpload = multer({ storage, limits: { fileSize: 52428800 }, fileFilter: filter.course }).fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'trailer', maxCount: 1 }
  ])
  coursePhotoUpload(req, res, (error) => {
    if (error instanceof multer.MulterError) return next(error)
    if (error) return next(error)
    return next()
  })
}

/** Certificate format photo */
upload.certificateFormatPhoto = (req, res, next) => {
  const location = `${baseLocation}/certificate-format/photo`
  util.createFolder(location)
  const storage = multer.diskStorage({
    destination: (_req, _file, _cb) => {
      _cb(null, location)
    },
    filename: (_req, _file, _cb) => {
      _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`)
    }
  })
  const certificateFormatPhotoUpload = multer({ storage, fileFilter: filter.image }).fields([
    { name: 'front_photo', maxCount: 1 },
    { name: 'back_photo', maxCount: 1 }
  ])
  certificateFormatPhotoUpload(req, res, (error) => {
    if (error instanceof multer.MulterError) return next(error)
    if (error) return next(error)
    return next()
  })
}

/* Course document */
upload.courseDocument = (req, res, next) => {
  const location = `${baseLocation}/course/document`
  util.createFolder(location)
  const storage = multer.diskStorage({
    destination: (_req, _file, _cb) => {
      _cb(null, location)
    },
    filename: (_req, _file, _cb) => {
      _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`)
    }
  })
  const courseDocumentUpload = multer({ storage, limits: { fileSize: 52428800 }, fileFilter: filter.document }).single('document')
  courseDocumentUpload(req, res, (error) => {
    if (error instanceof multer.MulterError) return next(error)
    if (error) return next(error)
    return next()
  })
}
/* Category image */
upload.categoryImage = (req, res, next) => {
  const location = `${baseLocation}/course/category/photo`
  util.createFolder(location)
  const storage = multer.diskStorage({
    destination: (_req, _file, _cb) => {
      _cb(null, location)
    },
    filename: (_req, _file, _cb) => {
      _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`)
    }
  })
  const courseCategoryUpload = multer({ storage, limits: { fieldSize: 5242880 }, fileFilter: filter.photo_location }).single('photo')
  courseCategoryUpload(req, res, (error) => {
    if (error instanceof multer.MulterError) return next(error)
    if (error) return next(error)
    return next()
  })
}

/** Import student from csv */
upload.studentList = (req, res, next) => {
  const location = `${baseLocation}/student/import`
  util.createFolder(location)
  const storage = multer.diskStorage({
    destination: (_req, _file, _cb) => {
      _cb(null, location)
    },
    filename: (_req, _file, _cb) => {
      _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`)
    }
  })
  const studentListUpload = multer({ storage, fileFilter: filter.excel }).single('student_list')
  studentListUpload(req, res, (error) => {
    if (error instanceof multer.MulterError) return next(error)
    if (error) return next(error)
    return next()
  })
}

/** Import student from csv */
upload.excelFile = (req, res, next) => {
  const location = `${baseLocation}/excel`
  util.createFolder(location)
  const storage = multer.diskStorage({
    destination: (_req, _file, _cb) => {
      _cb(null, location)
    },
    filename: (_req, _file, _cb) => {
      _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`)
    }
  })
  const uploadExcel = multer({ storage, fileFilter: filter.excel }).single('excel')
  uploadExcel(req, res, (error) => {
    if (error instanceof multer.MulterError) return next(error)
    if (error) return next(error)
    return next()
  })
}

module.exports = upload

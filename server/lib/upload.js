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
  },
  media: (req, file, cb) => {
    const allowTypes = [
      /** Document */
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/x-rar-compressed',
      'text/plain',
      /** Video */
      'video/mp4',
      'application/mp4',
      /** Image */
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      /** Excel */
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    if (!allowTypes.includes(file.mimetype)) {
      return cb(new Error('File type is not allowed'), false)
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

/** Task media */
upload.taskMedia = (req, res, next) => {
  const location = `${baseLocation}/task/media`
  util.createFolder(location)
  const storage = multer.diskStorage({
    destination: (_req, _file, _cb) => {
      if (_file.fieldname === 'media') {
        _cb(null, location)
      }
    },
    filename: (_req, _file, _cb) => {
      _cb(null, `${moment.utc().format('YYYYMMDDhhmmss')}_${_file.originalname}`)
    }
  })
  const taskMediaUpload = multer({ storage, fileFilter: filter.media, limits: { fileSize: 52428800 } }).single('media')
  taskMediaUpload(req, res, (error) => {
    if (error instanceof multer.MulterError) return next(error)
    if (error) return next(error)
    return next()
  })
}

module.exports = upload

const express = require('express')
const router = express.Router()
const authorController = require('../controllers/auth.controller')
const mediaController = require('../controllers/media.controller')
const upload = require('../lib/upload')

router.route('/:mediaId')
  /** PUT /api/media/:mediaId - update media */
  .put(authorController.validate, upload.taskMedia, mediaController.updateMedia)
  /** GET /api/media/:mediaId - get media by id */
  .get(authorController.validate, mediaController.getMedia)
  /** DELETE /api/media/:mediaId - delete media by id */
  .delete(authorController.validate, mediaController.deleteMedia)

router.param('mediaId', mediaController.loadMedia)

module.exports = router

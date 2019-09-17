const express = require('express');

const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

// /** Dashboard routes */
// router.route('/')
//     /** GET /api/dashboard - Get genreal info */
//     .get(dashboardController.generalInfo);

router.route('/general-info')
/** GET /api/dashboard/general-info - Get genreal info */
  .get(dashboardController.generalInfo);

module.exports = router;

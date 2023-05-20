const express = require('express');
const passport = require('passport');
const companyController = require('../controllers/companyController');
const router = express.Router();

// home route
router.get(
  '/home',
  passport.checkAuthentication,
  companyController.companyPage
);

// interview allocation route
router.get(
  '/allocate',
  passport.checkAuthentication,
  companyController.allocateInterview
);

// interview scheduling route
router.post(
  '/schedule-interview',
  passport.checkAuthentication,
  companyController.scheduleInterview
);
// to update status
router.post(
  '/update-status/:id',
  passport.checkAuthentication,
  companyController.updateStatus
);

module.exports = router;

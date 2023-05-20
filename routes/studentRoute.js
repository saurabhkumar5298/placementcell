const express = require('express');
const passport = require('passport');

const router = express.Router();

const studentController = require('../controllers/studentController');

// student creation page route
router.get(
  '/create',
  passport.checkAuthentication,
  studentController.createStudentPage
);

// delete student route
router.get(
  '/delete/:id',
  passport.checkAuthentication,
  studentController.deleteStudent
);

// to create student
router.post(
  '/create-student',
  passport.checkAuthentication,
  studentController.createStudent
);

module.exports = router;

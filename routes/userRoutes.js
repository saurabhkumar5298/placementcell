const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/userControllers');

// to sign up
router.get('/signup', userController.signup);

// to sign in
router.get('/signin', userController.signin);

// to sign out
router.get('/signout', passport.checkAuthentication, userController.signout);

// to download report
router.get(
  '/download-csv',
  passport.checkAuthentication,
  userController.downloadCsv
);

// create user
router.post('/create', userController.createUser);

// create session
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/users/signin' }),
  userController.createSession
);

module.exports = router;

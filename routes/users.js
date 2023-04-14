const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');




console.log('router loaded');

router.get('/profile',passport.checkAuthentication ,usersController.profile);

router.get('/sign_up',usersController.signup);

router.get('/sign_in',usersController.signin);

router.post('/create', usersController.create);

router.get('/create-session',usersController.createSession);

//use passport as a middleware to authenticate

router.post('/create-session',passport.authenticate(
    'local',{
        failureRedirect: '/users/sign_in'
    },), usersController.createSession
);

router.get('/sign-out',usersController.destroySession);

module.exports = router;
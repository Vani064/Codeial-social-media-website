const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');




console.log('router loaded');

router.get('/profile/:id',passport.checkAuthentication ,usersController.profile);
router.post('/update/:id',passport.checkAuthentication ,usersController.update);

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

router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);

module.exports = router;
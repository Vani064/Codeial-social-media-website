const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');




console.log('router loaded');

router.get('/profile',usersController.profile);

router.get('/sign_up',usersController.signup);

router.get('/sign_in',usersController.signin);

router.post('/create', usersController.create);

router.get('/create-session',usersController.createSession);

module.exports = router;
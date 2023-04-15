const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentcontroller = require('../controllers/comment_controller');

router.post('/create',passport.checkAuthentication,commentcontroller.create);

module.exports = router;
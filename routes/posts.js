const express = require('express');
const router = express.Router();

const postcontroller = require('../controllers/posts_controller');

router.get('/post',postcontroller.post);

module.exports = router;
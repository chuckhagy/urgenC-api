const express = require('express');
const router = express.Router();
const usersController = require('../lib/instances/usersController');

router.post('/user', userController.createUser);

module.exports = router;
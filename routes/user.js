const express = require('express');
const router = express.Router();
const usersController = require('../lib/instances/userController');

router.get('/', (req, res, next) => {
    res.send('Hello There, we are running')
});


// router.get('/user/:userid/goal-assignments');


router.post('/users', userController.create);



module.exports = router;
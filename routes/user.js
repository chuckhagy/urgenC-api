const express = require('express');
const router = express.Router();
const usersController = require('../lib/instances/userController');



router.post('/users', userController.create);


router.post('/users/token', (req, res, next) => {
    res.status(200).send('Hello, I am running')
});

router.get('/users/:userId', (req, res, next) => {
    res.status(200).send('Hello, I am running')
});

router.patch('/users/:userId', (req, res, next) => {
    res.status(200).send('Hello, I am running')
});

router.delete('/users/:userId', (req, res, next) => {
    res.status(200).send('Hello, I am running')
});

router.get('/users/:userId/goal-assignments', (req, res, next) => {
    res.status(200).send('Hello, I am running')
});

module.exports = router;
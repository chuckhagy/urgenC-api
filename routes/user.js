const express = require('express');
const router = express.Router();
const usersController = require('../lib/instances/userController');


router.get('/users', userController.getAll);
router.post('/users', userController.create);
router.get('/users/:userId', userController.getById);
router.patch('/users/:userId', userController.updateById);
router.delete('/users/:userId', userController.deleteById);
router.get('/users/:userId/goal-assignments', userController.getGoalsByAssignment);










module.exports = router;
const express = require('express');
const router = express.Router();
const goalsController = require('../lib/instances/goalController');

router.get('/goals', goalsController.getAll);
router.get('/goals/:ownerUserId', goalsController.getByOwnerUserId);
router.post('/goals', goalsController.create);
router.patch('/goals/:goalId', goalsController.updateById);
router.delete('/goals/:goalId', goalsController.deleteById);

router.get('/users/:userId/goal-assignments', goalsController.getGoalsByAssignment);


module.exports = router;
const express = require('express');
const router = express.Router();
const goalsController = require('../lib/instances/goalController');

router.get('/goals', goalsController.getAll);
router.post('/goals', goalsController.create);
router.patch('/goals/:goalId', goalsController.updateById);
router.delete('/goals/:goalId', goalsController.deleteById);
router.get('/goals/:goalId/goal-assignments', goalsController.getUsersByAssignment)


module.exports = router;


// router.get('/goals/goal-assignments/:ownerUserId', goalsController.getByOwnerUserId);

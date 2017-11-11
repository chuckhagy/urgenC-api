const express = require('express');
const router = express.Router();
const goalAssignmentsController = require('../lib/instances/goalAssignmentsController');

router.get('/goal-assignments/goal/:goalId', goalAssignmentsController.getUsersByAssignment)
router.post('/goal-assignments', goalAssignmentsController.create);
router.patch('/goal-assignments/:assignmentId', goalAssignmentsController.updateById);
router.delete('/goal-assignments/:assignmentId', goalAssignmentsController.deleteById);



module.exports = router;
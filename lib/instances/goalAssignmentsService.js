const GoalAssignmentService = require('../services/GoalAssignmentService');
const goalAssignmentRepository = require('./goalAssignmentRepository');
const userRepository = require('./goalAssignmentRepository');

let goalAssignmentService = new GoalAssignmentService({goalAssignmentRepository, userRepository});

module.exports = goalAssignmentService;
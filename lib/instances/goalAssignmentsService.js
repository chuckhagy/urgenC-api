const GoalAssignmentService = require('../services/GoalAssignmentService');
const goalAssignmentRepository = require('./goalAssignmentRepository');
const userRepository = require('./userRepository');
const goalRepository = require('./goalRepository');

let goalAssignmentService = new GoalAssignmentService({goalAssignmentRepository, userRepository, goalRepository});

module.exports = goalAssignmentService;
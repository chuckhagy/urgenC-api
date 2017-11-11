const GoalService = require('../services/GoalService');
const goalRepository = require('./goalRepository');
const userRepository = require('./userRepository');
const goalAssignmentRepository = require('./goalAssignmentRepository');

let goalService = new GoalService({goalRepository, userRepository, goalAssignmentRepository});

module.exports = goalService;
const GoalService = require('../services/GoalService');
const goalRepository = require('./goalRepository');
const userRepository = require('./userRepository');

let goalService = new GoalService({goalRepository, userRepository});

module.exports = goalService;
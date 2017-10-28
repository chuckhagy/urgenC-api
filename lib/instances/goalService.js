const GoalService = require('../services/GoalService');
const goalRepository = require('./goalRepository');

let goalService = new GoalService({goalRepository});

module.exports = goalService;
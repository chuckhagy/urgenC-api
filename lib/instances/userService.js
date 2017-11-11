const UserService = require('../services/UserService');
const userRepository = require('./userRepository');
const goalAssignmentRepository = require('./goalAssignmentRepository');

let userService = new UserService({userRepository, goalAssignmentRepository});

module.exports = userService;
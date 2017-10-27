const UserService = require('../services/UserService');

let userService = new UserService({
    // userValidator: require('./userValidator'),
    userRepository: require('./userRepository')
});

module.exports = userService;
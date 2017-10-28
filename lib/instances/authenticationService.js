const AuthenticationService = require('../services/AuthenticationService')
const UserRepository = require('./userRepository');

const {JWT_KEY} = require('../../env');

const authenticationService = new AuthenticationService({
   JWT_KEY,
    UserRepository
});

module.exports = authenticationService;
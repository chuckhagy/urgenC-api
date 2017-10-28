const Controller = require('../controllers/EntityController');
const userService = require('./userService');

userController = new Controller({
    entityName: 'User',
    entityService: userService
});

module.exports = userController;

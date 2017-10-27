const Controller = require('../controllers/EntityController');

userController = new Controller({
    entityName: 'User',
    entityService: require('./userService')
});

module.exports = userController;

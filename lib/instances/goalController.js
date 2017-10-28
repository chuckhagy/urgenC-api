const Controller = require('../controllers/EntityController');
const goalService = require('./goalService');

goalController = new Controller({
    entityName: 'Goal',
    entityService: goalService
});

module.exports = goalController;

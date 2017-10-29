const Controller = require('../controllers/EntityController');
const goalAssignmentsService = require('./goalAssignmentsService');

goalController = new Controller({
    entityName: 'Goal-Assignments',
    entityService: goalAssignmentsService
});

module.exports = goalController;

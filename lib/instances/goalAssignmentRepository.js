const EntityRepository = require('../repositories/EntityRepository');
const db = require('../../knex');

let goalAssignmentRepository = new EntityRepository ({
    entityName: 'GoalAssignment',
    db: db
});

module.exports = goalAssignmentRepository;
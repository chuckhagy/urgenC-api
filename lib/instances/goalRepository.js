const EntityRepository = require('../repositories/EntityRepository');
const db = require('../../knex');

let goalRepository = new EntityRepository ({
    entityName: 'Goal',
    db: db
});

module.exports = goalRepository;
const EntityRepository = require('../repositories/EntityRepository');
const db = require('../../knex');

let userRepository = new EntityRepository ({
    entityName: 'User',
    db: db
});

module.exports = userRepository;
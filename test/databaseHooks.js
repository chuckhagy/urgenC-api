'use strict';
const knex = require('../knex');

const addDatabaseHooks = func => {
    return function (...args) {
        beforeEach(done => {
            knex.migrate
                .rollback()
                .then(() => {
                    return knex.migrate.latest();
                })
                .then(() => {
                    return knex.seed.run();
                })
                .finally(() => {
                    done();
                });
        });
        after(done => {
            knex.migrate.rollback().finally(() => {
                knex.destroy(() => {
                    done();
                    setTimeout(() => {
                        process.exit(0);
                    }, 1000);
                });
            });
        });
        func(...args);
    };
};

module.exports = {addDatabaseHooks};
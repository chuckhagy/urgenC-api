
exports.up = function(knex, Promise) {
    return knex.schema.createTable('User', table => {
        table.increments();
        table.specificType('username', 'char(32)').unique().notNullable();
        table.specificType('role', 'char(32)').defaultTo('basic').notNullable();
        table.specificType('hashedPassword', 'char(60)').notNullable();
        table.specificType('displayName', 'char(32)').defaultTo('').notNullable();
        table.text('statusMessage').defaultTo('Hi everyone!');
        table.specificType('email', 'char(60)').unique().notNullable();
        table.specificType('profileColor', 'char(7)').defaultTo('#c90000').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('User')
};

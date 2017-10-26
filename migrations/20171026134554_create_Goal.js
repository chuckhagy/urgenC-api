exports.up = function (knex, Promise) {
    return knex.schema.createTable('Goal', table => {
            table.increments();
            table.specificType('title', 'char(32)').notNullable();
            table.text('body');
            table.specificType('dueDate', 'char(64)').notNullable();
            table.integer('priority').notNullable();
            table.integer('ownerUserId').references('id').inTable('User').notNullable().onDelete('cascade');
            table.timestamps(true, true);
        }
    )
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('Goal')
};

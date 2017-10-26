
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Message', table => {
      table.increments();
      table.text('body').notNullable();
      table.integer('userId').references('id').inTable('User').notNullable().onDelete('cascade');
      table.integer('goalId').references('id').inTable('Goal').notNullable().onDelete('cascade');
      table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Message')
};

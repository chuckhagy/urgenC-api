
exports.up = function(knex, Promise) {
  return knex.schema.createTable('GoalAssignment', table => {
      table.increments();
      table.integer('userId').references('id').inTable('User').notNullable().onDelete('cascade');
      table.integer('goalId').references('id').inTable('Goal').notNullable().onDelete('cascade');
      table.specificType('status', 'char(32)').defaultTo('pending').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('GoalAssignment')
};

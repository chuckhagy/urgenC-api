
exports.seed = function(knex, Promise) {
  return knex('Message').del()
    .then(function () {
      return knex('Message').insert([
          {body: 'You all are going down!', userId: 1, goalId: 1},
          // {body: 'You all are going down!', userId: 2, goalId: 2},
          // {body: 'You all are going down!', userId: 3, goalId: 3},
          // {body: 'You all are going down!', userId: 4, goalId: 4},
      ]);
    });
};

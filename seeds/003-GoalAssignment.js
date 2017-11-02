
exports.seed = function(knex, Promise) {
  return knex('GoalAssignment').del()
    .then(function () {
      return knex('GoalAssignment').insert([
          {userId: 2, goalId: 2, status: 'current'},
          {userId: 1, goalId: 1, status: 'current'},
          {userId: 3, goalId: 3, status: 'current'},
          {userId: 4, goalId: 4, status: 'current'},
          {userId: 2, goalId: 1, status: 'current'},
          {userId: 3, goalId: 1, status: 'current'},
          {userId: 4, goalId: 1, status: 'current'},
      ]);
    });
};


exports.seed = function(knex, Promise) {
  return knex('Goal').del()
    .then(function () {
      return knex('Goal').insert([
          {title: 'Buy a new car', body: 'N/A', dueDate: '2017-12-31T16:30:00.000Z', priority: 4, ownerUserId: 1},
          {title: 'Buy a new car', body: 'N/A', dueDate: '2017-11-30T16:30:00.000Z', priority: 3, ownerUserId: 1},
          {title: 'Buy a new car', body: 'N/A', dueDate: '2017-12-30T16:30:00.000Z', priority: 4, ownerUserId: 2},
          {title: 'Buy a new car', body: 'N/A', dueDate: '2017-11-25T16:30:00.000Z', priority: 2, ownerUserId: 2},
          {title: 'Buy a new car', body: 'N/A', dueDate: '2018-01-01T16:30:00.000Z', priority: 5, ownerUserId: 3},
          {title: 'Buy a new car', body: 'N/A', dueDate: '2017-12-20T16:30:00.000Z', priority: 2, ownerUserId: 3},
          {title: 'Buy a new car', body: 'N/A', dueDate: '2017-12-11T16:30:00.000Z', priority: 4, ownerUserId: 4},
          {title: 'Buy a new car', body: 'N/A', dueDate: '2017-12-15T16:30:00.000Z', priority: 1, ownerUserId: 4},
      ]);
    });
};

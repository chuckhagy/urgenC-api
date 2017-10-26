
exports.seed = function(knex, Promise) {
  return knex('User').del()
    .then(function () {
      return knex('User').insert([
        {username: 'chuckhagy', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Chuck Hagy', statusMessage: 'Crushing. It.', email: 'chuckhagy@gmail.com'},
        {username: 'melisaim', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Melisa Im', statusMessage: 'Going to fancy restaurants.', email: 'chuckhagy@gmail.com'},
        {username: 'jasonhsu', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Jason Hsu', statusMessage: 'Single-line solutions.', email: 'chuckhagy@gmail.com'},
        {username: 'stevencummings', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Steven Cummings', statusMessage: 'Eagle Eyes.', email: 'chuckhagy@gmail.com'},
      ]);
    });
};

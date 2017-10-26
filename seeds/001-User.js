
exports.seed = function(knex, Promise) {
    return knex('User').del()
        .then(function () {
            return knex('User').insert([
                {username: 'chuckhagy', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Chuck Hagy', profileColor:'#c99000', statusMessage: 'Crushing. It.', email: 'chuckhagy@gmail.com'},
                {username: 'melisaim', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Melisa Im', profileColor:'#c99000', statusMessage: 'Going to fancy restaurants.', email: 'me@gmail.com'},
                {username: 'jasonhsu', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Jason Hsu', profileColor:'#c99000', statusMessage: 'Single-line solutions.', email: 'j@gmail.com'},
                {username: 'stevencummings', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Steven Cummings', profileColor:'#c99000', statusMessage: 'Eagle Eyes.', email: 's@gmail.com'},
            ]);
        });
};

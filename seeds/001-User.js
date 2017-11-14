
exports.seed = function(knex, Promise) {
    return knex('User').del()
        .then(function () {
            return knex('User').insert([
                {role: 'admin', username: 'chuck', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Chuck Hagy', profileColor:'#c90000', statusMessage: 'Crushing. It.', email: 'chuckhagy@gmail.com'},
                // {username: 'melisa', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Melisa Im', profileColor:'#e8923c', statusMessage: 'Going to fancy restaurants.', email: 'melisa@gmail.com'},
                // {username: 'michael', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Michael M.', profileColor:'#3ae848', statusMessage: 'Alexa time.', email: 'm@gmail.com'},
                // {username: 'steven', hashedPassword: '$2a$10$sMcezAa4d2XsUD/uAS41te5tVH0qeE4z9VoR.bv5bP7T.EfFfUAdm', displayName: 'Steven C.', profileColor:'#4286f4', statusMessage: 'Eagle Eyes.', email: 's@gmail.com'},
            ]);
        });
};

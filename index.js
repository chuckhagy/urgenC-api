const { JWT_KEY } = require('./env');
const jwt = require('express-jwt');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const app  = express();

const user = require('./routes/user');
const goals = require('./routes/goals');
const authentication = require('./routes/authentication');

app.use(bodyParser.json());

app.use(
    jwt({
        secret: JWT_KEY,
        requestProperty: 'jwt.payload',
        credentialsRequired: false,
        audience: 'urgenC',
        issuer: 'urgenC'
    })
);

app.use((req, res, next) => {
    let authUserId = req.jwt ? req.jwt.payload.sub : undefined;
    if(typeof authUserId === 'number' && authUserId > 0) {
        req.authenticatedUserId = authUserId;
    } else req.authenticatedUserId = null;
    next();
});

app.use(user);
app.use(goals);
app.use(authentication);

app.all('*', (request, response, next) => {
    response.sendStatus(404)
});

app.listen(PORT, () => {
    console.log('Listening on ', PORT)
});``
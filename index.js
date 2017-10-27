const { JWT_KEY } = require('./env');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

const app  = express();
const user = require('./routes/user');

app.use(bodyParser.json());

app.use(user);

app.listen(PORT, () => {
    console.log('Listening on ', PORT)
});
const { JWT_KEY } = require('./env');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const app  = express();
const user = require('./routes/user');

//for dev purposes below
app.get('/', (req, res) => {
    res.send('We are up and running')
})

app.use(bodyParser.json());

app.use(user);

app.listen(PORT, () => {
    console.log('Listening on ', PORT)
});
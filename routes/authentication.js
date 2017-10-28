const express = require('express');
const router = express.Router();
const authenticationController = require('../lib/instances/authenticationController');


router.post('/users/token', authenticationController.token);
router.all('/users/token', (req, res, next) => {
    res.status(405).send('Method Not Allowed')
});


module.exports = router;
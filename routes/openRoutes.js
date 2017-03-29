const express = require('express');
const router = express.Router();

const user = require('../handlers/user');

router.post('/login', user.login);

module.exports = router;
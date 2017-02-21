const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/authentication').requireAuth;
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/api', requireAuth(), function(req, res, next) {
  // res.render('index', { title: 'Express' });

  res.send(req.user);
});

router.post('/token', function(req, res, next) {
  const key = process.env['JWT_KEY'];
  const token = jwt.sign({ userId: 1, }, key, { jwtid: '123' });
  res.send(token);

  // TODO:
  /*
   * 1. Check user credentials and get user row from DB
   * 2. Create a UUID, and include in the jwt payload with the userId
   * 3. send back the JWT
   *
  */
});

module.exports = router;

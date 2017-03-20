const express = require('express');
const Boom = require('boom');
const router = express.Router();

const User = require('../db/models/user');
const requireAuth = require('../middleware/authentication').requireAuth;
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/api', requireAuth(), function(req, res, next) {
  res.send(req.user);
});


/*
 * 1.
*/

router.post('/login', async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  console.log(req.body);
  try {
    const user = await User.login(email, password);
    const token = await user.createToken();
    res.send({ token });
  } catch(error) {
    if(error instanceof User.NotFoundError) {
      next(Boom.unauthorized('Invalid username or password'));
    } else {
      next(error);
    }
  }
});

router.post('/token', function(req, res, next) {
  const key = process.env['JWT_KEY'];
  const token = jwt.sign({ userId: 1, }, key);
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

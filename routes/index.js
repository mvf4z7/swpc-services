const express = require('express');
const Boom = require('boom');
const router = express.Router();

const User = require('../db/models/user');
const requireAuth = require('../middleware/authentication').requireAuth;
const jwt = require('jsonwebtoken');

// Handlers
const createItinerary = require('../handlers/itineraries/create');
const listItineraries = require('../handlers/itineraries/list');
const getItinerary = require('../handlers/itineraries/get');

router.get('/api/user', requireAuth(), function(req, res, next) {
  res.send(req.user);
});

router.post('/api/itineraries/', requireAuth(), createItinerary);
router.get('/api/itineraries/', requireAuth(), listItineraries);
router.get('/api/itineraries/:id/', requireAuth(), getItinerary);

router.post('/login', async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

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

module.exports = router;

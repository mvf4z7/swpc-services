const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/authentication').requireAuth;
const Celebrate = require('celebrate');

// require JWT authentication for all routes
router.use(jwtAuth());

// user routes
const user = require('../handlers/user');
router.get('/user', user.get);

// itineraries routes
const itineraries = require('../handlers/itineraries');
router.get('/itineraries/', itineraries.list);
router.post('/itineraries/', itineraries.create);
router.get('/itineraries/:id/', Celebrate(itineraries.get.validation), itineraries.get.handler);

module.exports = router;

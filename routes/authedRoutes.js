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
console.log(itineraries.update.handler);
router.get('/itineraries/', itineraries.list);
router.post('/itineraries/', itineraries.create);
router.get('/itineraries/:id/', Celebrate(itineraries.get.validation), itineraries.get.handler);
router.put('/itineraries/:id/', itineraries.update.handler);

module.exports = router;

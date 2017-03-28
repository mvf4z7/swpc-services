const express = require('express');
const router = express.Router();
const Boom = require('boom');

const requireAuth = require('../middleware/authentication').requireAuth;
const openRoutes = require('./openRoutes');
const authedRoutes = require('./authedRoutes');

router.use('/', openRoutes);

router.use('/api', authedRoutes);
router.get('/api/user', requireAuth(), function(req, res, next) {
  res.send(req.user);
});

module.exports = router;

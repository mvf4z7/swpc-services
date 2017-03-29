const express = require('express');
const router = express.Router();
const Boom = require('boom');

const requireAuth = require('../middleware/authentication').requireAuth;
const openRoutes = require('./openRoutes');
const authedRoutes = require('./authedRoutes');

router.use('/', openRoutes);
router.use('/api', authedRoutes);

module.exports = router;

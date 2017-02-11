const dbConfig = require('./config.js');
const knex = require('knex')(dbConfig);
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

const dbConfig = require('./config.js');
const knex = require('knex')(dbConfig);
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
bookshelf.plugin(require('bookshelf-uuid'));

module.exports = bookshelf;

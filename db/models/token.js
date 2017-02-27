const bookshelf = require('../bookshelf');

require('./user');

const Token = bookshelf.Model.extend({
  tableName: 'tokens',
  uuid: true,
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = bookshelf.model('Token', Token);

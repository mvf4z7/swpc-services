const bookshelf = require('../bookshelf');

require('./user');

const Itinerary = bookshelf.Model.extend({
  tableName: 'itineraries',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = bookshelf.model('Itinerary', Itinerary);

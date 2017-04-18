const bookshelf = require('../bookshelf');
const _ = require('lodash');
const dateFns = require('date-fns');

require('./user');

const Itinerary = bookshelf.Model.extend({
  tableName: 'itineraries',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User');
  },

  parse: function(attrs) {
    const dateFields = ['outbound_date', 'return_date'];
    
    dateFields.forEach( field => {
      if(_.isUndefined(attrs[field])) {
        return;
      }

      attrs[field] = parseDateField(attrs[field]);
    });

    return attrs;
  }
});

function parseDateField(dateObj) {
  return dateFns.format(dateObj, 'MM/DD/YYYY');
}

module.exports = bookshelf.model('Itinerary', Itinerary);

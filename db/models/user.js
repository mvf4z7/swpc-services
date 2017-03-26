const bookshelf = require('../bookshelf');
const hashHelpers = require('../../util/hash');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

const Token = require('./token');
const Itinerary = require('./itinerary');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  tokens: function() {
    return this.hasMany('Token');
  },

  itineraries: function() {
    return this.hasMany('Itinerary')
  },

  createToken: async function() {
    const tokenRow = await this.related('tokens').create();
    const data = {
      userId: this.get('id'),
      tokenId: tokenRow.get('id')
    };
    const key = process.env['JWT_KEY'];
    return jwt.sign(data, key);
  }
}, {
  createAccount: async function(email, password) {
    const emailLower = email.toLowerCase();
    const hash = await hashHelpers.generate(password);
    const newUser = await new this({
      email: emailLower,
      password: hash,
      type: 'standard'
    }).save()

    return newUser;
  },

  login: async function(email, password) {
    const user = await new this({ email }).fetch({ require: true });
    const hash = user.get('password');
    const validPassword = await hashHelpers.compare(password, hash);
    if(!validPassword) {
      return Promise.reject(new this.NotFoundError());
    }

    return user;
  }
});

module.exports = bookshelf.model('User', User);

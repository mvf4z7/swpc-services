const bookshelf = require('../bookshelf');
const hashHelpers = require('../../util/hash');
const Promise = require('bluebird');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
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

module.exports = User;

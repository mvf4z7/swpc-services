const bookshelf = require('../bookshelf');
const hashHelpers = require('../../util/hash');

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
    const user = await new this({ email }).fetch();
    const hash = user.get('password');
    const validPassword = await hashHelpers.compare(password, hash);
    if(!validPassword) {
      throw new Error('Invalid Password');
    }

    return user;
  }
});

module.exports = User;

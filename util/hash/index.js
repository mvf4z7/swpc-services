const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function generate(plaintext) {
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}

function compare(plaintext, hash) {
  return bcrypt.compare(plaintext, hash);
}

module.exports = {
  generate,
  compare
};

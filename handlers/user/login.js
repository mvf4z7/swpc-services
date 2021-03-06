const Boom = require('boom');
const User = require('../../db/models/user');

async function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.login(email, password);
    const token = await user.createToken();
    res.send({ token });
  } catch(error) {
    if(error instanceof User.NotFoundError) {
      next(Boom.unauthorized('Invalid username or password'));
    } else {
      next(error);
    }
  }
}

module.exports = login;
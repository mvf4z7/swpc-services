const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env['JWT_KEY'],
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  const user = {
    id: 1,
    email: 'mike.fanger@gmail.com',
    type: 'admin'
  };

  done(null, user);
}));

function requireAuth() {
  return passport.authenticate('jwt', { session: false });
}

module.exports = {
  requireAuth: requireAuth
};

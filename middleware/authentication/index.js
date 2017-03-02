const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const _ = require('lodash');

const User = require('../../db/models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env['JWT_KEY'],
};

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    const user = await User.where({ id: jwt_payload.userId }).fetch({
      require: true,
      withRelated: [{ tokens: query => {
        query.where('id', jwt_payload.tokenId);
      }}],
      columns: ['id', 'email', 'type', 'created_at', 'updated_at'],
    });
    done(null, user);
  } catch(error) {
    if(error instanceof User.NotFoundError) {
      done(null, false)
    } else {
      done(error);
    }
  }
}));

function requireAuth() {
  return passport.authenticate('jwt', { session: false });
}

module.exports = {
  requireAuth: requireAuth
};

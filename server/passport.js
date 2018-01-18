const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const auth = require('./auth');
const { users } = require('../database');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    if (await auth.checkUser(username, password)) {
      return done(null, await users.get(username));
    }
    return done(null, false);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    return done(null, await users.getById(id));
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const auth = require('./auth');
const { userHelper } = require('../../database');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    if (await auth.checkUser(username, password)) {
      return done(null, await userHelper.getUser(username));
    }
    return done(null, false);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    return done(null, await userHelper.getUserById(id));
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ 'username': username }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        User.comparePassword(password, user.password, function(err, isMatch) {
          if (err) done(err);
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false);
        });
      });
    }));
};
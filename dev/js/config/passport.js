var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/user');
var configAuth = require('./auth');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.uid);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({uid: id}, function(err, user) {
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

  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.clientID,
    consumerSecret: configAuth.twitterAuth.clientSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  },
  function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'twitter.id': profile.id }, function (err, user) {
        if (err) return done(err);
        if (user) return done(null, user);
        else {
          var newUser = new User({
            uid: profile.username + '-' + Date.now().toString(36),
            username: profile.username + '-twitter',
            password: '',
            email: '',
            usertag: 'User',
            ups: 0,
            mod: false,
            admin: false,
            twitter: {
              id: profile.id,
              displayName: profile.username,
              username: profile.displayName
            }
          });

          newUser.save(function (err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
  },
  function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'github.id': profile.id }, function (err, user) {
        if (err) return done(err);
        if (user) return done(null, user);
        else {
          var newUser = new User({
            uid: profile.username + '-' + Date.now().toString(36),
            username: profile.username + '-github',
            password: '',
            email: '',
            usertag: 'User',
            ups: 0,
            mod: false,
            admin: false,
            github: {
              id: profile.id,
              displayName: profile.username,
              username: profile.displayName
            }
          });

          newUser.save(function (err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
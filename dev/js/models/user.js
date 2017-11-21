var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var User = new Schema({
  uid: String,
  username: String,
  password: String,
  email: String,
  usertag: String,
  ups: Number,
  mod: Boolean,
  admin: Boolean
}, { collection: 'users' });

module.exports = mongoose.model('User', User);

module.exports.cryptPassword = function(newUser, cb) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(cb);
    });
  });
};

module.exports.comparePassword = function(inputPassword, hash, cb) {
  bcrypt.compare(inputPassword, hash, function(err, isMatch) {
    if (err) throw err;
    cb(null, isMatch);
  });
};
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var User = new Schema({
  username: String,
  password: String,
  hint: String
}, { collection: 'users' });

module.exports = mongoose.model('User', User);

module.exports.createUser = function(newUser, cb) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(cb);
    });
  });
};

module.exports.comparePassword = function(inputPassword, hash, cb) {
  bcrypt.compare(inputPassword, hash, function(err, isMatch) {
    if (err) cb(err);
    cb(null, isMatch);
  });
};
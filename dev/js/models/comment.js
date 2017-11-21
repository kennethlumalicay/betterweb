var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  cid: String,
  pid: String,
  uid: String,
  username: String,
  usertag: String,
  comment: String,
  ups: Number,
  guest: Boolean,
  timestamp: Number
}, { collection: 'comments' });

module.exports = mongoose.model('Comment', Comment);
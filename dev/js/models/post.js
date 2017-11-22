var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
  pid: String,
  uid: String,
  username: String,
  usertag: String,
  img: String,
  imgLocation: String,
  title: String,
  description: String,
  liveLink: String,
  githubLink: String,
  timestamp: Number,
  ups: Number,
  guest: Boolean,
  locked: Boolean,
  commentCount: Number
}, { collection: 'posts' });

module.exports = mongoose.model('Post', Post);
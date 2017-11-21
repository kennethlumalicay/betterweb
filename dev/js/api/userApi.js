import User from '../models/user.js';
import { updateAllUserPost } from './postApi.js';

export const fetchUsers = (query, cb) => {
  User.find({}, (err, res) => {
    if(err) throw err;
    cb(res);
  });
};

export const fetchUser = (query, cb) => {
  User.findOne({ uid: query[0] }, (err, res) => {
    if(err) throw err;
    cb(res);
  });
};

export const addUser = (query, cb) => {
  let newUser = new User({
    uid: query.username + '-' + Date.now().toString(36),
    username: query.username,
    password: query.password,
    email: query.email,
    usertag: query.usertag,
    ups: 0,
    mod: false,
    admin: false
  });
  User.cryptPassword(newUser, (err, updatedUser) => {
    if (err) throw err;
    cb(updatedUser);
  });
};

export const updateUser = (query, cb) => {
  User.findOne({ uid: query.uid }, (err, user) => {
    if(err) throw err;
    Object.keys(query).forEach(key => {
      user[key] = query[key] ? query[key] : user[key];
    });
    if(query.password) {
      User.cryptPassword(user, (err, updatedUser) => {
        if (err) throw err;
        updateAllUserPost(updatedUser, cb);
      });
      return false;
    }
    user.save(err => {
      if(err) throw err;
      updateAllUserPost(user, cb);
    });
  });
};

export const removeUser = (query, cb) => {
  User.remove({ uid: query.uid }, err => {
    if (err) throw err;
    cb(query.id);
  });
};
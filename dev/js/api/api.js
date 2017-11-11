// import axios from 'axios';
import User from '../models/user.js';

// Samples
export const fetchUsers = (query, cb) => {
  User.find({}, (err, res) => {
    cb(res);
  });
};

export const addUser = (query, cb) => {
  let newUser = new User({
    username: query.username,
    password: query.password,
    hint: query.hint
  });
  User.createUser(newUser, err => {
    if (err) cb(err);
    cb(newUser);
  });
};

export const removeUser = (query, cb) => {
  User.remove({ _id: query.id }, err => {
    if (err) cb(err);
    cb(query.id);
  });
};
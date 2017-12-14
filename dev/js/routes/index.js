import * as userApi from './../api/userApi.js';
import * as postApi from './../api/postApi.js';
import * as commentApi from './../api/commentApi.js';

module.exports = function (app, passport, upload) {

  app.route('/login')
    .post(passport.authenticate('local', {successRedirect: '/', failureRedirect: '/?failed'}));

  app.route('/signout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/');
    });

  app.route('/register')
    .post(function (req, res, next) {
      userApi.addUser(req.body, (docs) => {
        req.login(docs, (err) => {
          if(err) return next(err);
          res.redirect('/');
        });
      });
    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/'
    }));

  app.route('/auth/github')
    .get(passport.authenticate('github'));

  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/'
    }));

  app.route('/api/fetchUsers')
    .get(function (req, res) {
      userApi.fetchUsers(req.query, (docs) => res.send(docs));
    });

  app.route('/api/fetchUser')
    .get(function (req, res) {
      userApi.fetchUser(req.query, (docs) => res.send(docs));
    });

  app.route('/api/updateUser')
    .post(function (req, res) {
      userApi.updateUser(req.query, (docs) => res.send(docs));
    });

  app.route('/api/fetchPosts')
    .get(function (req, res) {
      postApi.fetchPosts(req.query, (docs) => res.send(docs));
    });

  app.route('/api/fetchOnePost')
    .get(function (req, res) {
      postApi.fetchOnePost(req.query, (docs) => res.send(docs));
    });

  app.route('/api/addPost')
    .post(upload.single('img'), function (req, res) {
      postApi.addPost({...req.body, ...req.query, img: req.file.key, imgLocation: req.file.location}, (docs) => res.send(docs));
    });

  app.route('/api/editPost')
    .post(upload.single('newImg'), function (req, res) {
      const newImg = !req.file ? {new: false} : {
        new: true,
        newImg: req.file.key,
        newImgLocation: req.file.location
      };
      postApi.editPost({...req.body, ...req.query, ...newImg}, (docs) => res.send(docs));
    });

  app.route('/api/deletePost')
    .post(function (req, res) {
      postApi.deletePost(req.query, (docs) => res.send(docs));
    });

  app.route('/api/fetchComments')
    .get(function (req, res) {
      commentApi.fetchComments(req.query, (docs) => res.send(docs));
    });

  app.route('/api/fetchPageComments')
    .get(function (req, res) {
      commentApi.fetchPageComments(req.query, (docs) => res.send(docs));
    });

  app.route('/api/addComment')
    .post(function (req, res) {
      commentApi.addComment(req.query, (docs) => res.send(docs));
    });

  app.route('/api/deleteComment')
    .post(function (req, res) {
      commentApi.deleteComment(req.query, (docs) => res.send(docs));
    });

  app.route('/api/upvote')
    .post(function (req, res) {
      userApi.upvote(req.query, (docs) => res.send(docs));
    });
};
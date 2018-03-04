import * as userApi from './../api/userApi.js';
import * as postApi from './../api/postApi.js';
import * as commentApi from './../api/commentApi.js';

const api = {userApi, postApi, commentApi};

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

  // Make routes for strategies
  for(const strategy of strategies) {
    app.route(`/auth/${strategy}`)
      .get(passport.authenticate(strategy));

    app.route(`/auth/${strategy}/callback`)
      .get(passport.authenticate(strategy, {
        successRedirect: '/',
        failureRedirect: '/'
      }));
  }

  // Make routes for common apis
  for(const route of routes) {
    app.route(`/api/${route.name}`)[route.type]((req, res) => {
      api[route.api][route.name](req.query, docs => res.send(docs));
    });
  }

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
};

const strategies = ['twitter', 'github'];

const routes = [
  {
    name: 'fetchUsers',
    type: 'get',
    api: 'userApi'
  },
  {
    name: 'fetchUser',
    type: 'get',
    api: 'userApi'
  },
  {
    name: 'updateUser',
    type: 'post',
    api: 'userApi'
  },
  {
    name: 'upvote',
    type: 'post',
    api: 'userApi'
  },
  {
    name: 'checkPost',
    type: 'post',
    api: 'postApi'
  },
  {
    name: 'fetchPosts',
    type: 'get',
    api: 'postApi'
  },
  {
    name: 'fetchOnePost',
    type: 'get',
    api: 'postApi'
  },
  {
    name: 'deletePost',
    type: 'post',
    api: 'postApi'
  },
  {
    name: 'fetchComments',
    type: 'get',
    api: 'commentApi'
  },
  {
    name: 'fetchPageComments',
    type: 'get',
    api: 'commentApi'
  },
  {
    name: 'fetchComments',
    type: 'get',
    api: 'commentApi'
  },
  {
    name: 'addComment',
    type: 'post',
    api: 'commentApi'
  },
  {
    name: 'deleteComment',
    type: 'post',
    api: 'commentApi'
  }
];
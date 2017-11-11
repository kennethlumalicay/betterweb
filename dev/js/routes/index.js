var api = require('./../api/api.js');


module.exports = function (app, passport) {
  const email = process.env.EMAIL_SUPPORT;

  app.route('/admin/login')
    .post(passport.authenticate('local', {successRedirect: '/admin', failureRedirect: '/admin/failed?' + email}));

  app.route('/signout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/admin');
    });

  app.route('/api/fetchAdmins')
    .get(function (req, res) {
      api.fetchUsers(req.query, (docs) => res.send(docs));
    });

  app.route('/api/addAdmin')
    .get(function (req, res) {
      api.addUser(req.query, (docs) => res.send(docs));
    });

  app.route('/api/removeAdmin')
    .get(function (req, res) {
      api.removeUser(req.query, (docs) => res.send(docs));
    });
};
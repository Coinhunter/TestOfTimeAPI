'use strict';

var user_handler = require('../../handlers/user-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var authenticateRole = require('../../middleware/role-authentication.js')('admin');

module.exports = function (app) {
  app.get('/users',
    ensureLoggedIn,
    authenticateRole,
    list_users);
};

function list_users(req, res, next) {
  user_handler.list(null, {}, function (err, statuscode, users) {
    if (err) {
      return next(err);
    } else {
  	  res.render('user-list', {
  	  	usr: req.user,
  	    users: users
  	  });
    }
  });
}
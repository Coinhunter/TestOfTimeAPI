'use strict';

var user_handler = require('../../handlers/user-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/users',
    ensureLoggedIn, 
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
'use strict';

var user_handler = require('../../handlers/user-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/users/:userId',
    ensureLoggedIn, 
    show_profile);
};

function show_profile(req, res, next) {
  user_handler.getUserById(null, { _id: req.params.userId }, function (err, statuscode, user) {
    if (err) {
      return next(err);
    } else {
  	  res.render('user-profile', {
  	  	usr: req.user,
  	    profuser: user
  	  });
    }
  });
}
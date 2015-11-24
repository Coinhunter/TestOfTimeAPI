'use strict';

var user_handler = require('../../handlers/user-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/user/new',
    ensureLoggedIn, 
    show_form);

  app.post('/user/new',
    ensureLoggedIn,
    user_create);  
};

function show_form(req, res, next) {
  res.render('user-create', {
      user: req.user
    });
}

function user_create(req, res, next) {
  user_handler.create(req.user, req.body, function(err, status, user) {
    if(err) {
      console.log(err);
      next(err);
    } else {
      console.log(user);
      res.redirect('/users');
    }
  });
}
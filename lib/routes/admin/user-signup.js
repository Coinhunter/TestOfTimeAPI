'use strict';

var user_handler = require('../../handlers/user-handler.js');

module.exports = function (app) {
  app.get('/signup',
    show_form);

  app.post('/signup',
    user_create);
};

function show_form(req, res, next) {
  res.render('user-signup');
}

function user_create(req, res, next) {
  user_handler.userSignup(req.body, function(err, user) {
    if(err) {
      res.render('user-signup', { error: err });
    } else {
      res.render('user-created', user);
    }
  });
}
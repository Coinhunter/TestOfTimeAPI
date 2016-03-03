'use strict';

var user_handler = require('../../handlers/user-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var authenticateRole = require('../../middleware/role-authentication.js')('admin');

module.exports = function (app) {
  app.get('/setup',
    ensureLoggedIn,
    authenticateRole, 
    show_form);

  app.get('/setup/usertoken',
    ensureLoggedIn,
    authenticateRole,
    create_token);
};

function show_form(req, res, next) {
  user_handler.listUserTokens(req.user, function(err, tokens) {
    if (err) {
      res.render('setup', {
        user: req.user
      });
    } else {
      console.log(tokens);
      res.render('setup', {
        user: req.user,
        tokens: tokens
      });
    }
  });
}

function create_token(req, res, next) {
  user_handler.createUserToken(function(err, token) {
    if (err) {
      res.redirect('/setup');
    } else {
      res.redirect('/setup');
    }
  });
}
'use strict';

var user_handler = require('../../handlers/user-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var authenticateRole = require('../../middleware/role-authentication.js')('admin');

module.exports = function (app) {
  app.get('/setup',
    ensureLoggedIn,
    authenticateRole, 
    show_form);

};

function show_form(req, res, next) {
  res.render('setup', {
      user: req.user
    });
}
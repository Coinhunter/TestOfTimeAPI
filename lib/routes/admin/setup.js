'use strict';

var user_handler = require('../../handlers/user-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/setup',
    ensureLoggedIn, 
    show_form);

};

function show_form(req, res, next) {
  res.render('setup', {
      user: req.user
    });
}
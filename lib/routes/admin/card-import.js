'use strict';

var resource_handler = require('../../handlers/resource-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/cards/import/:filename',
    ensureLoggedIn, 
    load_cards);
};

function load_cards(req, res, next) {
  resource_handler.loadFromFile(req.user, req.params.filename, function (err, statuscode) {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/cards');
    }
  });
}
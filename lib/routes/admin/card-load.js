'use strict';

var card_handler = require('../../handlers/card-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/preloadcards',
    ensureLoggedIn, 
    load_cards);
};

function load_cards(req, res, next) {
  card_handler.loadcards(req.user, function (err, statuscode) {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/cards');
    }
  });
}
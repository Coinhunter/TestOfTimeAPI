'use strict';

var card_handler = require('../../handlers/card-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/cards',
    ensureLoggedIn, 
    list_cards);

  app.get('/cards/category/:category',
    ensureLoggedIn,
    list_cards_category);
};

function list_cards(req, res, next) {
  card_handler.list(null, {}, function (err, statuscode, cards) {
    if (err) {
      return next(err);
    } else {
  	  res.render('card-list', {
  	  	user: req.user,
  	    cards: cards
  	  });    	
    }
  });
}

function list_cards_category(req, res, next) {
  card_handler.list(req.user, { category: req.params.category }, function (err, statuscode, cards) {
    if (err) {
      return next(err);
    } else {
      res.render('card-list', {
        user: req.user,
        cards: cards,
        category: req.params.category
      });
    }
  });
}
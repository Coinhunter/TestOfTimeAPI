'use strict';

var card_handler = require('../../handlers/card-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/cards',
    ensureLoggedIn, 
    list_cards);
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
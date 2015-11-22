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
      console.log(cards);
	  res.render('card-list', {
	  	user: req.user,
	    cards: cards
	  });    	
    }
  });
}

	/*
    users.list(req.user, req.params, function(err, status, json) {
      if (err) {
        sendError(err, res);
      }
      else {
        res.send(status, json);
      }
    });
	*/

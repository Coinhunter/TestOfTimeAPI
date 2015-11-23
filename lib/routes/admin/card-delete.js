'use strict';

var card_handler = require('../../handlers/card-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/cards/delete/:card_id',
    ensureLoggedIn, 
    delete_card);
};

function delete_card(req, res, next) {
	card_handler.remove(req.user, req.params, function(err, statuscode, result) {
		if(err) {
			next();
		} else {
			res.redirect('/cards');
		}
	});
}
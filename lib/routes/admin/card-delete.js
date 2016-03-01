'use strict';

var card_handler = require('../../handlers/card-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var authenticateRole = require('../../middleware/role-authentication.js')('admin');

module.exports = function (app) {
  app.get('/cards/delete/:card_id',
    ensureLoggedIn,
    authenticateRole, 
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
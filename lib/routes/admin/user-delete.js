'use strict';

var user_handler = require('../../handlers/user-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/user/delete/:user_id',
    ensureLoggedIn, 
    delete_user);
};

function delete_user(req, res, next) {
	user_handler.remove(req.user, req.params, function(err, statuscode, result) {
		if(err) {
			next();
		} else {
			res.redirect('/users');
		}
	});
}
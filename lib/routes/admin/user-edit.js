'use strict';

var user_handler = require('../../handlers/user-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.post('/user/edit/:user_id',
    ensureLoggedIn, 
    edit_user);
};

function edit_user(req, res, next) {
	var params = {};
	params['role'] = req.body.role;
	params['_id'] = req.params.user_id;

	user_handler.editUser(req.user, params, function(err, result) {
		if(err) {
			console.log(err);
			res.redirect('/users');
		} else {
			console.log(result);
			res.redirect('/users');
		}
	});
}
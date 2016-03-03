'use strict';

var category_handler = require('../../handlers/category-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var authenticateRole = require('../../middleware/role-authentication.js')('admin');

module.exports = function (app) {
  app.get('/category/delete/:category',
    ensureLoggedIn,
    authenticateRole,
    delete_category);
};

function delete_category(req, res, next) {
	category_handler.remove(req.user, req.params, function(err, statuscode, result) {
		if(err) {
			next();
		} else {
			res.redirect('/categories');
		}
	});
}
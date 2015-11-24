'use strict';

var category_handler = require('../../handlers/category-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/category/delete/:category',
    ensureLoggedIn, 
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
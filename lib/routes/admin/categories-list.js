'use strict';

var category_handler = require('../../handlers/category-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/categories',
    ensureLoggedIn, 
    list_categories);
};

function list_categories(req, res, next) {
  category_handler.list(null, {}, function (err, statuscode, categories) {
    if (err) {
      return next(err);
    } else {
	  res.render('category-list', {
	  	user: req.user,
	    categories: categories
	  });    	
    }
  });
}
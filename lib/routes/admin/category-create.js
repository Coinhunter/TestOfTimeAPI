'use strict';

var category_handler = require('../../handlers/category-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/category/new',
    ensureLoggedIn, 
    show_form);

  app.post('/category/new',
    ensureLoggedIn,
    category_create);  
};

function show_form(req, res, next) {
  res.render('category-create', { user: req.user } );
};

function category_create(req, res, next) {
  category_handler.add(req.user, req.body, function(err, status, category) {
    if(err) {
      next(err);
    } else {
      res.redirect('/categories');  
    }
  });
};
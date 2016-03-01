'use strict';

var category_handler = require('../../handlers/category-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var resource_handler = require('../../handlers/resource-handler.js');
var authenticateRole = require('../../middleware/role-authentication.js')('admin');

module.exports = function (app) {
  
  app.get('/cards/export',
    ensureLoggedIn,
    authenticateRole,
    show_form);

  app.post('/cards/export',
    ensureLoggedIn,
    authenticateRole,
    export_cards);

  app.get('/cards/deletefile/:filename',
    ensureLoggedIn,
    authenticateRole,
    delete_file);

};


function show_form(req, res, next) {
  resource_handler.listResourceFiles(req.user, function(card_err, cardStatuscode, files) {
    category_handler.list(req.user, {}, function(cat_err, categoryStatuscode, cats) {
      if(card_err || cat_err) {
        res.render('card-export-form', { err: true });
      } else {
        res.render('card-export-form', { err: false, files: files, category: req.params.category, categories: cats });
      }
    });
  });
}


function export_cards(req, res, next) {
  var params = {};
  params.category = req.body.category;
  params.filename = req.body.filename;

  resource_handler.exportCardsToFile(req.user, params, function(err) {
    if (err) {
      res.redirect('/cards/export');
    } else {
      res.redirect('/cards/export');
    }
  });
}

function delete_file(req, res, next) {
  var filename = req.params.filename;
  resource_handler.removeFile(filename);
  res.redirect('/cards/export');
}

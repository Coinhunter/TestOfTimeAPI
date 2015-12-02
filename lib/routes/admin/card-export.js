'use strict';

var card_handler = require('../../handlers/card-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/cards/export/:category',
    ensureLoggedIn, 
    show_form);

  /*
  
  app.post('/cards/export',
    ensureLoggedIn,
    export_cards);
  
  */
};

function show_form(req, res, next) {
  card_handler.listresfiles(req.user, function(err, statuscode, files) {
    res.render('card-export-form', { files: files, category: req.params.category }) ;    
  });
}

function export_cards(req, res, next) {
  card_handler.exportCards(req.user, req.params, function(err, statuscode) {
    if (err) {
      res.render('/');
    } else {
      res.render('card-', {
        user: req.user
      });
    }
  });
}

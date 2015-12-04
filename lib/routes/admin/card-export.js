'use strict';

var card_handler = require('../../handlers/card-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function (app) {
  app.get('/cards/export/:category',
    ensureLoggedIn, 
    show_form);
  
  app.get('/cards/export/:filename/:category',
    ensureLoggedIn,
    export_cards);

  app.post('/cards/export/:category',
    ensureLoggedIn,
    export_cards_post);

  app.get('/cards/deletefile/:filename',
    ensureLoggedIn,
    delete_file);

};


function show_form(req, res, next) {
  card_handler.listresfiles(req.user, function(err, statuscode, files) {
    res.render('card-export-form', { files: files, category: req.params.category }) ;    
  });
}


function export_cards(req, res, next) {
  var params = {};
  params.filename = req.params.filename;
  params.category = req.params.category;
  card_handler.expcards(req.user, params, function(err) {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
}

function export_cards_post(req, res, next) {
  var params = {};
  params.category = req.params.category;
  params.filename = req.body.filename;
  card_handler.expcards(req.user, params, function(err) {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
}

function delete_file(req, res, next) {
  var filename = req.params.filename;
  card_handler.removefile(filename);
  res.redirect('/');
}

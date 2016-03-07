'use strict';

var card_handler = require('../../handlers/card-handler.js');
var card_validator = require('../../handlers/card-validator.js');
var category_handler = require('../../handlers/category-handler.js');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var card_utils = require('../../util/cardutils.js');

module.exports = function (app) {
  app.get('/cards/edit/:card_id',
    ensureLoggedIn, 
    show_form);

  app.post('/cards/edit/:card_id',
    ensureLoggedIn,
    card_edit,
    redirect);  
};

function show_form(req, res, next) {
  getShowFormInfo(req, function(err, data) {
    if (err) {
      res.render('card-edit', {
          err: err,
          user: data.user,
          card: data.card,
          categories: data.categories
        });
    } else {
      res.render('card-edit', {
          user: data.user,
          card: data.card,
          categories: data.categories
        });
    }
  });
}

function card_edit(req, res, next) {
  var card = req.body;
  card._id = req.params.card_id;
  var params = card_validator.validateCardParams(req.body);

  if (params.err) {
    getShowFormInfo(req, function (err, data) {
      if (err) {
        res.render('card-edit', {
            err: err,
            user: data.user,
            card: data.card,
            categories: data.categories
          });
      } else {
        res.render('card-edit', {
            err: params.err,
            user: data.user,
            card: data.card,
            categories: data.categories
          });
      }
    });

  } else {
    card_utils.getLanguageKeys(function (languagesList) {

      for(var i = 0 ; i < languagesList.length ; i++) {
        if(card.hasOwnProperty(languagesList[i])) {
          if(typeof card[languagesList[i]] === 'string' && card[languagesList[i]].length > 0) {
            if(!card.hasOwnProperty('languages')) {
              card.languages = {};
            }
            card.languages[languagesList[i]] = card[languagesList[i]];
          }
        }
      }

      card_handler.update(req.user, card, function(cardErr, statuscode, updated_card){
        if (cardErr) {
          getShowFormInfo(req, function (err, data) {
            if (err) {
              res.render('card-edit', {
                  err: err,
                  user: data.user,
                  card: data.card,
                  categories: data.categories
                });
            } else {
              res.render('card-edit', {
                  err: cardErr,
                  user: data.user,
                  card: data.card,
                  categories: data.categories
                });
            }
          });
        } else {
          next();
        }
      });

    });
  }
}

function getShowFormInfo(req, callback) {
  category_handler.list(req.user, {}, function (categoryError, statuscode, categories) {
    if (categoryError) {
      callback(categoryError);
    } else {
      card_handler.find(req.user, { _id: req.params.card_id }, function (cardError, statuscode, card) {
        if (cardError) {
          callback(cardError);
        } else {
          card_utils.getLanguageKeys(function (languagesList) {
            card['existinglanguages'] = languagesList;
            if (!card.hasOwnProperty('languages'))
              card['languages'] = {};
            callback(null, {
              user: req.user,
              card: card,
              categories: categories
            });
          });
        }
      });
    }
  });
}

function redirect(req, res) {
  res.redirect('/cards');
}
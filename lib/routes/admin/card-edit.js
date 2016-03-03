'use strict';

var card_handler = require('../../handlers/card-handler.js');
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
  category_handler.list(req.user, {}, function (cat_err, statuscode, categories) {
    if (cat_err) {
      return next(cat_err);
    }
	card_handler.find(req.user, { _id: req.params.card_id }, function(card_err, statuscode, card) {
		if (card_err) {
			return next(card_err);
		}

		card_utils.getLanguageKeys(function (languagesList) {
			card['existinglanguages'] = languagesList;

			if (!card.hasOwnProperty('languages')) { 
				card['languages'] = {};
			}

			res.render('card-edit', {
		    	user: req.user,
		    	card: card,
		    	categories: categories
		    });
		});
	});
  });
}

function card_edit(req, res, next) {
	var card = req.body;
	card._id = req.params.card_id;

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

		card_handler.update(req.user, card, function(err, statuscode, updated_card){
			if (err) {
				next(err);
			} else {
				next();
			}
		});
	});
}

function redirect(req, res) {
	res.redirect('/cards');
}
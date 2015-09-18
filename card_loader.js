var cardCreator = require('./lib/handlers/card-create.js'),
	config = require('config'),
	mongoose = require('mongoose'),
	CardModel = require('./lib/models/card.js'),
	db = require('./lib/db.js'),
	fs = require("fs");

var json = fs.readFileSync('./res/cards.json');
var cardArray = JSON.parse(json);


cardArray.forEach(function(card) {
	cardCreator.convertParamsToCard(
	{
		question: card.question,
		year: card.year
	}, function(err, returned_card){
		if(err){
			console.log('Something went wrong: ' + err);
			process.exit(1);
		} else {
			var card = new CardModel(returned_card);
			db.connect(function(err) {
				if (err) {
					console.log('Error connecting to database');
					if (callback) {
						callback(err);
					}
					process.exit(1);
				}
				card.save(function (err, card) {
					if (err) {
						console.error(err);
						process.exit(1);
					}
					else {
						console.log('Card created...');
					}
				});
			});
		}
	});
});
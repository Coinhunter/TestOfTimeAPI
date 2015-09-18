var cardCreator = require('./lib/handlers/card-create.js'),
	config = require('config'),
	mongoose = require('mongoose'),
	CardModel = require('./lib/models/card.js'),
	db = require('./lib/db.js');

cardCreator.convertParamsToCard(
{
	question: 'The RMS Titanic collides with an iceberg and sinks, taking 1500 people with it.',
	year: 1912
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
					console.log('Card created: ' + card);
					process.exit();
				}
			});
		});
	}
});
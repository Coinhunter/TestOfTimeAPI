var Card = require('../models/card.js');

exports.getLanguageKeys = function(callback) {
	var props = Object.keys(Card.schema.paths);
	var arrayLength = props.length;
	var languages = [];

	for (var i = 0; i < arrayLength; i++) {    
	    var substring = 'languages';
	    if(props[i].indexOf(substring) > -1) {
			var res = props[i].substring(10, props[i].length);
			languages.push(res);
		}
	}

	callback(languages);
};
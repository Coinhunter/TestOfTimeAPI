'use strict';

/*
{
	"question": "Question that has a year as answer",
	"year": 1492
}
*/

exports.validateCreateParams = function(params) {
	if(!params.hasOwnProperty('year')) {
		params = sanitize(params);
		params.err = { err: 'Missing year'};
		return params;
	} else {
		if(!isNumber(params.year)) {
			params = sanitize(params);
			params.err = { err: 'year must be a number'};
			return params;
		}
	}

	if(!params.hasOwnProperty('question')) {
		params = sanitize(params);
		params.err = { err: 'Missing question'};
		return params;
	} else {
		if(!isNonEmptyStr(params.question)) {
			params = sanitize(params);
			params.err = { err: 'Question must be non-empty string'};
			return params;
		}
	}

	if(!params.hasOwnProperty('category')) {
		params = sanitize(params);
		params.err = { err: 'Missing category'};
		return params;
	} else {
		if(!isNonEmptyStr(params.category)) {
			params = sanitize(params);
			params.err = { err: 'Category must be non-empty string'};
			return params;
		}
	}

	return sanitize(params);
} 

function isNonEmptyStr(s) {
  return typeof s === 'string' && s.length > 0;
}

function isNumber(obj) { 
	return !isNaN(parseFloat(obj));
}

function sanitize(params) {
	var sanitized_params = new Object();
	sanitized_params.question = params.question;
	sanitized_params.year = params.year;
	sanitized_params.category = params.category;
	return sanitized_params;
}

'use strict';

//expressValidator = require('express-validator');

exports.validateCreateParams = function(params) {
	params = validateYear(params);
	if(params.hasOwnProperty('err')) {
		return sanitize(params);		
	}
	params = validateQuestion(params);
	if(params.hasOwnProperty('err')) {
		return sanitize(params);		
	}	
	params = validateCategory(params);
	if(params.hasOwnProperty('err')) {
		return sanitize(params);		
	}

	//In case none of the validations returned err.
	return sanitize(params);
}

function isNonEmptyStr(s) {
  return typeof s === 'string' && s.length > 0;
}

function isNumber(obj) { 
	return !isNaN(parseFloat(obj));
}

function validateYear(params) {
	if(!params.hasOwnProperty('year')) {
		params.err = 'Missing year';
	} else {
		if(!isNumber(params.year)) {
			params.err = 'Year must be a number';
		}
	}
	return params;
}

function validateQuestion(params) {
	if(!params.hasOwnProperty('question')) {
		params.err = 'Missing question';
	} else {
		if(!isNonEmptyStr(params.question)) {
			params.err = 'Question must be non-empty string';
		}
	}
	return params;
}

function validateCategory(params) {
	if(!params.hasOwnProperty('category')) {
		params.err = 'Missing category';
	} else {
		if(!isNonEmptyStr(params.category)) {
			params.err = 'Category must be non-empty string';
		}		
	}
	return params;
}

function sanitize(params) {
	var err;
	var founderr = false;
	if (params.hasOwnProperty('err')) { 
		err = params.err;
		founderr = true;
	}

	var sanitized_params = new Object();
	sanitized_params.question = params.question;
	sanitized_params.year = params.year;
	sanitized_params.category = params.category;
	sanitized_params.languages = params.languages;
	sanitized_params._id = params._id;

	if (founderr) {
		sanitized_params.err = err;
	}
	return sanitized_params;
}

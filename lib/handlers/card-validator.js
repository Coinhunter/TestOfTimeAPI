'use strict';

//expressValidator = require('express-validator');

exports.validateCreateParams = function(params) {
	params = validateYear(params);
	if(params.hasOwnProperty('err')) {
		return sanitize(params);		
	}

	params = validateLanguages(params);
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

exports.validateCardParams = function(params) {
	params = validateYear(params);
	params = validateCategory(params);
	params = validateLanguages(params);
	return params;
}

function validateLanguages(params) {
	console.log(params);

	if(params.languages) {
		if (!isNonEmptyStr(params.languages.en) && !isNonEmptyStr(params.languages.sv)) {
			params.err = 'Must have a question in either swedish or english.';
		}		
	} else {
		var languages = {};
		languages['en'] = '';
		languages['sv'] = '';

		if (isNonEmptyStr(params.sv)) {
			languages['sv'] = params.sv;
		}

		if (isNonEmptyStr(params.en)) {
			languages['en'] = params.en;
		}

		if (!isNonEmptyStr(params.en) && !isNonEmptyStr(params.sv)) {
			params.err = 'Must have a question in either swedish or english.';
		}

		params.languages = languages;		
	}

	return params;
}

function validateYear(params) {
	if(!params.hasOwnProperty('year')) {
		params.err = 'Missing year.';
	} else {
		if(!isNumber(params.year)) {
			params.err = 'Year must be a number.';
		}
	}
	return params;
}

function validateCategory(params) {
	if(!params.hasOwnProperty('category')) {
		params.err = 'Missing category.';
	} else {
		if(!isNonEmptyStr(params.category)) {
			params.err = 'Category must be non-empty string.';
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
	sanitized_params.year = params.year;
	sanitized_params.category = params.category;
	sanitized_params.languages = params.languages;
	
	if(params._id) {
		sanitized_params._id = params._id;		
	}

	if (founderr) {
		sanitized_params.err = err;
	}
	return sanitized_params;
}

function isNonEmptyStr(s) {
  return typeof s === 'string' && s.length > 0;
}

function isNumber(obj) { 
	return !isNaN(parseFloat(obj));
}

'use strict';

exports.validateAddParams = function(params) {
	if(!params.hasOwnProperty('category')) {
		params = sanitize(params);
		params.err = { err: 'Missing category'};
		return params;
	} else {
		if(!isNonEmptyStr(params.category)) {
			params = sanitize(params);
			params.err = { err: 'year must be a number'};
			return params;
		}
	}
	return sanitize(params);
} 

function isNonEmptyStr(s) {
  return typeof s === 'string' && s.length > 0;
}

function sanitize(params) {
	var sanitized_params = new Object();
	sanitized_params.category = params.category;
	return sanitized_params;
}

'use strict';

/**
 * Handler that takes input paramaters for a user.
 * adds param.err if something is up and needs fixing.
 * @type {Object}
 */

var EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

/*
{"id": "TestOfTimeAdminID2",
"name": "admin2",
"email": "testoftime2@time.now",
"password": "password"}
*/

exports.validateRequiredParams = function(params) {  

	if(!params.hasOwnProperty('name')) {
		params = sanitize(params);
		params.err = { err: 'Missing name'};
		return params;
	} else {
		if(!isNonEmptyStr(params.name)) {
			params = sanitize(params);
			params.err = { err: 'name must be non-empty string'};
			return params;
		}
	}

	if(!params.hasOwnProperty('email')) {
		params = sanitize(params);
		params.err = { err: 'Missing email'};
		return params;
	} else {
		if(!isNonEmptyStr(params.email)) {
			params = sanitize(params);
			params.err = { err: 'email must be non-empty string'};
			return params;
		}
		if(!EMAIL_REGEXP.test(params.email)) {
			params = sanitize(params);
			params.err = { err: 'email must be valid'};
			return params;
		}
	}

	if(!params.hasOwnProperty('id')) {
		params = sanitize(params);
		params.err = { err: 'Missing Id'};
		return params;
	} else {
		if(!isNonEmptyStr(params.id)) {
			params = sanitize(params);
			params.err = { err: 'Id must be non-empty string'};
			return params;
		}
	}

	if(!params.hasOwnProperty('password')) {
		params = sanitize(params);
		params.err = { err: 'Missing password'};
		return params;
	} else {
		if(!isNonEmptyStr(params.password)) {
			params = sanitize(params);
			params.err = { err: 'password must be non-empty password'};
			return params;
		}
	}
	return sanitize(params);
}

function sanitize(params) {
	var sanitized_params = new Object();
	sanitized_params.name = params.name;
	sanitized_params.email = params.email;
	sanitized_params.id = params.id;
	sanitized_params.password = params.password;
	return sanitized_params;
}


function isNonEmptyStr(s) {
  return typeof s === 'string' && s.length > 0;
}
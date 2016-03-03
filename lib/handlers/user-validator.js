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

	if(!params.hasOwnProperty('role')) {
		params = sanitize(params);
		params.err = { err: 'Missing role'};
		return params;
	} else {
		if(!isNonEmptyStr(params.role) && validRole(params.role)) {
			params = sanitize(params);
			params.err = { err: 'name must be non-empty string and either "admin" or "editor"'};
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

	if(!params.hasOwnProperty('password2')) {
		params = sanitize(params);
		params.err = { err: 'Missing password2'};
		return params;
	} else {
		if(params.password.valueOf() != params.password2.valueOf()) {
			params = sanitize(params);
			params.err = { err: 'Passwords did not match' };
			return params;
		}
	}
	return sanitize(params);
}

function validRole(role) {
	return role == 'admin' || role == 'editor';
}

function sanitize(params) {
	var sanitized_params = new Object();
	sanitized_params.email = params.email;
	sanitized_params.id = params.id;
	sanitized_params.password = params.password;
	sanitized_params.role = params.role;
	return sanitized_params;
}


function isNonEmptyStr(s) {
  return typeof s === 'string' && s.length > 0;
}
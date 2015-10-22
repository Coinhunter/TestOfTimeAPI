/**
 * Main server entry file.
 */

'use strict';

var SERVER_TYPE = process.env.SERVER_TYPE;
var APP = SERVER_TYPE ? 'api' : 'admin';
var server;

if (SERVER_TYPE === 'api') {
	server = require('./lib/api-server.js');
} else if (SERVER_TYPE === 'admin') {
	server = require('./lib/admin-server.js')
} else {
	console.log("SERVER_TYPE process environment variable missing or wrong - either 'api' or 'admin'");
	return;
}

// Start server
server.startServer();
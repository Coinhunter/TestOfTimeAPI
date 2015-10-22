'use strict';

var app,
	express = require('express'),
	mongoose = require('mongoose'),
	less_middleware = require('less-middleware'),
	Config = require('config'),
	browserify = require('browserify-middleware');


/**
 * Starts server.
 */
exports.startServer = startServer;

/**
 * Stop server.
 */
exports.stopServer = stopServer;

function startServer(callback) {
	app = express();

	app.get('/', function(req, res){
	  res.send('hello world');
	});

	app.listen(Config.admin.port);
}

function stopServer(callback) {

}
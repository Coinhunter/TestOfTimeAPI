'use strict';

var restify = require('restify'),
	db = require('./db.js'),
	config = require('config'),
	authentication = require('./middleware/authentication.js'),
	router = require('./routes/router.js'),
	server;

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

/**
 * Starts server.
 */
exports.startServer = startServer;

/**
 * Stop server.
 */
exports.stopServer = stopServer;

function startServer(callback) {

	// connect to database via db module
	db.connect(function(err) {
		if (err) {
			console.log('Error connecting to database');
			if (callback) {
				callback(err);
			}
			return;
		}

		// Create the server
		server = restify.createServer({
			name: config.server.name,
			version: "0.0.1"
		});
		
		// Configuration
		server.use(restify.queryParser());
		server.use(restify.bodyParser({mapParams: true}));

		// Authentication of requests
		server.use(restify.authorizationParser());
		server.use(authentication);

		// Set up routes
		router(server);

		server.listen(8080, function() {
			console.log('%s listening at %s', server.name, server.url);
			if(callback) {
				callback();
			}
		});

	});


}

function stopServer(callback) {
  console.log('Stopping server');
  server.close(function() {
    db.disconnect(callback);
  });
}
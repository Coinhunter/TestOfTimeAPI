'use strict';

var restify = require('restify'),
	db = require('./db.js'),
	config = require('config'),
	authentication = require('./middleware/authentication.js'),
	router = require('./routes/router.js'),
	logger = require('./util/logger.js'),
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

	logger.info('Starting server...');

	// connect to database via db module
	db.connect(function(err) {
		if (err) {
			logger.error('Error connecting to database');
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

		server.listen(config.server.port, function() {
			logger.info('%s listening at %s', server.name, server.url);
			if(callback) {
				callback();
			}
		});

	});


}

function stopServer(callback) {
  logger.info('Stopping server');
  server.close(function() {
    db.disconnect(callback);
  });
}
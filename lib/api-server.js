'use strict';

var restify = require('restify'),
	db = require('./db.js'),
	authentication = require('./middleware/authentication.js'),
	server;

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

/**
 * Starts server.
 *
 */
exports.startServer = startServer;

/**
 * Stop server.
 *
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
		/*
		server = restify.createServer({
			name: 'TestOfTime API',
			version: 1.0
		});
		*/
		server = restify.createServer();
		
		// Configuration
		server.use(restify.queryParser());
		server.use(restify.bodyParser());

		// Authentication of requests
		server.use(restify.authorizationParser());
		server.use(authentication);

		server.get('/hello/:name', respond);
		server.head('/hello/:name', respond);

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
    //db.disconnect(callback);
  });
}
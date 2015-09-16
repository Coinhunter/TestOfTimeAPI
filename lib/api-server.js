'use strict';

var restify = require('restify'),
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

function startServer(callback) {
	server = restify.createServer();
	server.get('/hello/:name', respond);
	server.head('/hello/:name', respond);

	server.listen(8080, function() {
		console.log('%s listening at %s', server.name, server.url);
		if(callback) {
			callback();
		}
	});
}

function stopServer(callback) {
  console.log('Stopping server');
  server.close(function() {
    //db.disconnect(callback);
  });
}
'use strict';

/**
 * Main API server file.
 */
var restify = require('restify'),
    config = require('config'),
    server,
    router = require('./routes/router.js'),
    logger = require('./util/logger.js'),
    authentication = require('./middleware/authentication.js'),
    db = require('./db.js'),
    api_version = require('../package.json').version;


/**
 * Starts server by connecting to database and listening to the configured port.
 * @type {Function}
 */
exports.startServer = startServer;


/**
 * Stops any running server.
 * @param {Function} callback Invoked when closed.
 * @type {Function}
 */
exports.stopServer = stopServer;


function startServer(callback) {
  logger.debug('Starting server...');

  // connect to database via db module
  db.connect(function(err) {
    if (err) {
      if (callback) {
        callback(err);
      }
      return;
    }

    // Create server
    server = restify.createServer({
      name: config.server.name,
      version: api_version,
      formatters: {
        'application/hal+json': function(req, res, body) {
          return res.formatters['application/json'](req, res, body);
        }
      }
    });

    // Configure server
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    // Authenticate requests
    server.use(restify.authorizationParser());
    server.use(authentication);

    // Set up routes (NOTE: needs to be done after server config)
    router(server);

    server.listen(config.server.port, function() {
      if (callback) {
        callback();
      }
    });
  });
}


function stopServer(callback) {
  server.close(function() {
    db.disconnect(callback);
  });
}

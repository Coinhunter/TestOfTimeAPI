/**
 * Server entry file. File that is run to start up 
 * server.
 */

'use strict';

var api_server = require('./lib/api-server.js');

// Start the API server..
api_server.startServer();
var mongoose = require('mongoose'),
    config = require('config'),
    db_connection;


/**
 * @type {Function}
 * @return {Connection} the shared connection (opened or not).
 */
exports.model = model;


/**
 * Connects to database (unless already connected).
 * @type {Function}
 * @param {Function} callback Invoked when done with [err].
 */
exports.connect = connect;


/**
 * Disconnects from database.
 * @type {Function}
 * @param {Function} callback Invoked with [err].
 */
exports.disconnect = disconnect;


// Private functions


function model(name, schema) {
  var conn = wrapped_connection().connection();
  try {
    // Try to retrieve existing model from connection.
    return conn.model(name);
  }
  catch (e) {
    // Define model on connection if not defined.
    return conn.model(name, schema);
  }
}


function connect(callback) {
  wrapped_connection().connect(callback);
}


function disconnect(callback) {
  wrapped_connection().disconnect(callback);
}

function wrapped_connection() {
  if (!db_connection) {
    db_connection = mongoose.createConnection(
      config.mongo.uri);
  }
  return db_connection;
}

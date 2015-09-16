var mongoose = require('mongoose'),
    //config = require('config'),
    //create_wrapped_connection = require('mongoose-connection'),
    //logger = require('./util/logger.js'),
    db_connection,
    db_uri = 'mongodb://localhost/testoftime';


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
  var conn;
  if(db_connection) {
    conn = db_connection;
  } else {
    connect(function() {
      conn = db_connection;
    });
  }

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
  if (!db_connection) {
    db_connection = mongoose.connect(db_uri);
  }
  callback();
}


function disconnect(callback) {
  mongoose.disconnect(function(){
    //Close all connections
  });
}

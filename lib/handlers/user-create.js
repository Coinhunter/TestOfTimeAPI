'use strict';

/**
 * Handler that mainly reads and writes from user collection.
 * @type {Object}
 */


//var validator = require('./user-validator.js'),
var bcrypt = require('bcrypt'),
    UserModel = require('../models/user.js'),
    hashids = require('../util/hashids.js'),
    logger = require('../util/logger.js');


/**
 * Converts input params to an actual User mongoose object.
 * @param {Object} params Parameters to use when populating user.
 * @param {Function} callback Invoked with [err, user].
 */
exports.convertParamsToUser = function(params, callback) {
  //params = validator.validateCreateParams(params);

  if (params.err) {
    setImmediate(callback, params.err);
    return;
  }

  hashPassword(params.password, function(err, hash) {
    var user;

    if (err) {
      logger.error('Error hashing password', err);
      callback(err);
      return;
    }

    params.hash = hash;
    delete params.password;

    

    user = new UserModel(params);

    callback(null, user);
  });
};

/**
 * Hashes a password using bcrypt with salt.
 * @param {String} password The password to hash.
 * @param {Function} callback Invoked with [err,hash] once done.
 * @private
 */
function hashPassword(password, callback) {
  bcrypt.genSalt(function(err, salt) {
    if (err) {
      callback(err);
    }
    else {
      bcrypt.hash(password, salt, callback);
    }
  });
}

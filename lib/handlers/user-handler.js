'use strict';


//var validator = require('./user-validator.js'),
var convertParams = require('./user-create.js'),
    UserModel = require('../models/user.js'),
    PUBLIC_USER_FIELDS = 'id name email created_at updated_at';


/**
 * @param {User} au The authenticated user
 * @param {Object} params Request params
 * @param {function(err, status, json)} callback
 */
exports.list = function(au, params, callback) {
  var query;

  console.log('Listing users...');

  //params = validator.validateListParams(params);

  if (params.err) {
    setImmediate(callback, params.err);
    return;
  }

  console.log('Setting up query...');

  query = UserModel.find({},
    PUBLIC_USER_FIELDS,
    { lean: true });

  console.log('Checking params.limit...');

  if (params.limit) {
    query.limit(params.limit);
  }

  console.log('Executing query...');

  query.exec(function(err, result) {
    if (err) {
      callback(null, 500, {err: result});
    }
    else {
      callback(null, 200, result);
    }
  });
};


/**
 * @param {User} au The authenticated user
 * @param {Object} params Request params
 * @param {function(err, status, json)} callback
 */
 /*
exports.show = function(au, params, callback) {
  var query;

  params = validator.validateShowParams(params);

  if (params.err) {
    setImmediate(callback, params.err);
    return;
  }

  query = UserModel.findById(params._id,
    PUBLIC_USER_FIELDS,
    { lean: true });

  query.exec(function(err, result) {
    if (err) {
      callback(createError(500));
    }
    else if (!result) {
      callback(createError(404, 'User not found'));
    }
    else {
      callback(null, 200, result);
    }
  });
};
*/

/**
 * @param {User} au The authenticated user
 * @param {Object} params Request params
 * @param {function(err, status, json)} callback
 */
 /*
exports.authenticatedUser = function(au, params, callback) {
  setImmediate(callback, null, 200, {
    id: au.id,
    name: au.name,
    email: au.email,
    admin: au.admin,
    created_at: au.created_at,
    updated_at: au.updated_at
  });
};
*/


/**
 * @param {User} au The authenticated user
 * @param {Object} params Request params
 * @param {function(err, status, json)} callback
 */
 /*
exports.create = function(au, params, callback) {
  convertParams.convertParamsToUser(params, function(err, user) {
    if (err) {
      callback(err);
      return;
    }

    user.save(function(err, user) {
      if (err) {
        // TODO: status 409 if dup key in mongo
        callback(createError(500));
        return;
      }

      callback(null, 201, {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        created_at: user.created_at,
        updated_at: user.updated_at
      });
    });
  });
};

*/





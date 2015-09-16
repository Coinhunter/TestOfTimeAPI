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

  //params = validator.validateListParams(params);

  if (params.err) {
    setImmediate(callback, params.err);
    return;
  }

  query = UserModel.find({},
    PUBLIC_USER_FIELDS,
    { lean: true });

  if (params.limit) {
    query.limit(params.limit);
  }

  console.log('Executing query...');

  query.exec(function(err, result) {
    if (err) {
      console.log('Internal error...');
      callback(err, 500, {err: '500'});
    }
    else {
      console.log('Any moment now...');
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
exports.create = function(au, params, callback) {
  convertParams.convertParamsToUser(params, function(err, user) {
    if (err) {
      callback(err);
      return;
    }

    user.save(function(err, user) {
      if (err) {
        // TODO: status 409 if dup key in mongo
        callback(err);
        return;
      }

      callback(null, 201, {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      });
    });
  });
};





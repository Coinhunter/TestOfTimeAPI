'use strict';


//var validator = require('./user-validator.js'),
var convertParams = require('./user-create.js'),
    UserModel = require('../models/user.js'),
    PUBLIC_USER_FIELDS = 'id name email role created_at updated_at _id',
    logger = require('../util/logger.js'),
    bcrypt = require('bcrypt');

exports.getAuthenticated = getAuthenticated;


exports.userSignup = function(params, callback) {
  params['role'] = 'editor';

  var query = UserModel.find(
    { $or: [ { email: params.email }, { id: params.id } ] },
    PUBLIC_USER_FIELDS,
    { lean:true }
  );

  query.exec(function(err, result) {
    if (err) {
      callback('Internal Server Error');
    }
    else {
      if ( result.length > 0 ) {
        callback('Username or Email already exists');
      } else {
        convertParams.convertParamsToUser(params, function(err, user) {
          if (err) {
            console.log(err);
          } else {
            user.save(function(err, returneduser) {
              if (err) {
                callback('Internal Server Error');           
              } else {
                callback(null, {
                  id: returneduser.id
                });
              }
            });
          }
        });        
      }
    }
  });
};


exports.getUserById = function(au, params, callback) {
  
  if (!params._id) {
    callback('missing id', 500, null);
  }

  var query = UserModel.findOne({ _id: params._id },
    PUBLIC_USER_FIELDS,
    { lean: true });

  query.exec(function(err, result) {
    if (err) {
      callback(err, 500, {err: '500'});
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
exports.list = function(au, params, callback) {
  var query;

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

  query.exec(function(err, result) {
    if (err) {
      logger.error('Internal error: ' + err);
      callback(err, 500, {err: '500'});
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
exports.create = function(au, params, callback) {
  convertParams.convertParamsToUser(params, function(err, user) {
    if (err) {
      callback(err);
      return;
    }

    user.save(function(err, returneduser) {
      if (err) {
        console.log(err);
        // TODO: status 409 if dup key in mongo
        callback(err);
        return;
      } else {
        console.log(returneduser);
        callback(null, 201, {
          id: returneduser.id,
          name: returneduser.name,
          email: returneduser.email,
          created_at: returneduser.created_at,
          updated_at: returneduser.updated_at
        });
      }
    });
  });
};

exports.remove = function(au, params, callback) {
  var query;

  if (params.err) {
    setImmediate(callback, params.err);
  }

  query = UserModel.remove({ _id: params.user_id });

  query.exec(function(err, result) {
    if (err) {
      logger.error('Internal error: ' + err);
      callback(err, 500, {err: '500'});
    }
    else {
      callback(null, 200, result);
    }
  });
}

exports.editUser = function(au, params, callback) {  
  UserModel.findOneAndUpdate({
    _id: params._id
  }, {
    $set: {
      role: params.role
    }
  }, function (err, user) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);      
    }
  });
}


/**
 * getAuthenticated performs an authentication attempt
 * against database. Unless we find a match the user will
 * be presented with a null value (no difference between a
 * faulty password and a nonexisting username).
 *
 * @param {String} email - the email address of the user.
 * @param {String} password - the password of the user.
 * @param {requestCallback} callback - function handling the result.
 */
function getAuthenticated(email, password, callback) {
  UserModel.findOne({ email: email }, function (err, user) {
    /* istanbul ignore if: untestable err from mongodb */
    if (err) {
      return callback(err, null);
    }
    if (!user) {
      return callback(null, null);
    }

    bcrypt.compare(password, user.hash, function (err, valid) {
      if(err) {
        console.log(err);
      }
      callback(err, !err && valid ? user : null);
    });

  });
}




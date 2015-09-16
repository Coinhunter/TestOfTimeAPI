'use strict';

var bcrypt = require('bcrypt'),
    UserModel = require('../models/user.js');


/**
 * Authenticates user in incoming request.
 * @type {Function}
 * @param {Object} req The incoming request.
 * @param {Object} res The response object.
 * @param {Function} next Next middleware to be invoked.
 */
module.exports = authenticateRequest;


function authenticateRequest(req, res, next) {
  var username,
      password,
      route = req.route.path;

  if (route === '/') {
    next();
    return;
  }

  if (!req.authorization || !req.authorization.basic) {
    console.log('No basic auth provided with request');
    return unauth(res);
  }

  username = req.authorization.basic.username;
  password = req.authorization.basic.password;

  UserModel.findOne({
    email: username
  }, function(err, user) {
    if (err || !user) {
      return unauth(res);
    }

    bcrypt.compare(password, user.hash, function(err, correct) {
      if (err || !correct) {
        return unauth(res);
      }

      req.user = user;
      next();
    });
  });
}

function unauth(res) {
  res.send(401, { message: 'Unauthorized' });
}

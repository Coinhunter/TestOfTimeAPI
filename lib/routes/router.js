'use strict';

var users = require('../handlers/user-handler.js'),
    cards = require('../handlers/card-handler.js'),
    user_validator = require('../handlers/user-validator.js'),
    card_validator = require('../handlers/card-validator.js');

/** @param {Restify} server */
module.exports = function(server) {
  server.get('/', ping);
  server.head('/', ping);

  //// Users
  
  server.get('/users', function(req, res, next) {
    users.list(req.user, req.params, function(err, status, json) {
      if (err) {
        sendError(err, res);
      }
      else {
        res.send(status, json);
      }
    });
  });

  server.post('/users', function(req, res, next) {
    var params = user_validator.validateRequiredParams(req.params);
    users.create(req.user, params, function(err, status, json) {
      if (err) {
        sendError(err, res);
      }
      else {
        res.send(status, json);
      }
    });
  });

  //// Cards

  server.post('/cards', function(req, res, next) {
    var params = card_validator.validateCreateParams(req.params);
    cards.create(req.user, params, function(err, status, json) {
      if (err) {
        sendError(err, res);
      }
      else {
        res.send(status, json);
      }
    });
  });


  //// User unformation

  server.get('/whoami', function(req, res, next) {
    console.log(req);
    res.send(200, req.user);
  });

}

function ping(req, res) {
  res.send(200, {});
}


function sendError(err, res) {
  var status = err.code || 500;
  res.send(status, err);
}

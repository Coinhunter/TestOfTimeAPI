'use strict';

var users = require('../handlers/user-handler.js'),
    cards = require('../handlers/card-handler.js'),
    categories = require('../handlers/category-handler.js'),
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

  server.get('/whoami', function(req, res, next) {
    res.send(200, req.user);
  });

  // Get 100 cards. Will just return the first 100 entries.
  server.get('/cards', function(req, res, next) {
    var params = req.params;
    params.limit = 100;
    cards.list(req.user, params, function(err, status, json) {
      if (err) {
        sendError(err, res);
      }
      else {
        res.send(status, json);
      }
    });
  });

  server.get('/cards/:category', function(req, res, next) {
    var params = req.params;
    params.limit = 100;
    cards.list(req.user, params, function(err, status, json) {
      if (err) {
        sendError(err, res);
      }
      else {
        res.send(status, json);
      }
    });
  });

  //// Categories

  server.get('/categories', function(req, res, next) {
    var params = req.params;
    categories.list(req.user, params, function(err, status, json) {
      if (err) {
        sendError(err, res);
      }
      else {
        res.send(status, json);
      }
    });
  });

}

function ping(req, res) {
  res.send(200, {});
}


function sendError(err, res) {
  var status = err.code || 500;
  res.send(status, err);
}

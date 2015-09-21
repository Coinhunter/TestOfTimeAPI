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

  server.get('/whoami', function(req, res, next) {
    console.log(req);
    res.send(200, req.user);
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

  server.post('/categories', function(req, res, next) {
    categories.add(req.user, req.params, function(err, status, json) {
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

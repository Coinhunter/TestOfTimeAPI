'use strict';

var categoryHandler = require('../handlers/category-handler.js');
var cardHandler = require('../handlers/card-handler');

/** @param {Restify} server */
module.exports = function(server) {
  server.get('/', ping);
  server.head('/', ping);

  server.get('/whoami', function(req, res, next) {
    res.send(200, req.user);
  });

  server.get('/cards/:category/:language', function(req, res, next) {
    var params = req.params;
    params.limit = 100;
    cardHandler.apiList(req.user, params, function(err, status, json) {
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
    categoryHandler.list(req.user, params, function(err, status, json) {
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

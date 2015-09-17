'use strict';

var users = require('../handlers/user-handler.js');


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
    users.create(req.user, req.params, function(err, status, json) {
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

}

function ping(req, res) {
  res.send(200, {});
}


function sendError(err, res) {
  var status = err.code || 500;
  var json = err.json || '{ message: Something went horribly wrong. }';
  res.send(status, json);
}

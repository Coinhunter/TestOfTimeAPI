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

  server.get('/whoami', function(req, res, next) {
    res.send(200, req.user);
  });

}

function ping(req, res) {
  // must return 200 for ELB health check to work
  res.send(200, {});
}


function sendError(err, res) {
  var status = err.code || 500;
  var json = err.json || 'Something went horribly wrong.';
  res.send(status, json);
}

'use strict';

var users = require('../handlers/user-handler.js');


/** @param {Restify} server */
module.exports = function(server) {
  server.get('/', ping);
  server.head('/', ping);

  //// Users

  server.get('/users', users.list);

  /*
  server.get('/users',
    bridge(users.list, {
      admin: true
    }));

  server.post('/users',
    bridge(users.create, {
      admin: true
    }));

  server.get('/users/:user',
    bridge(users.show));

  server.del('/users/:user',
    bridge(users.remove, {
      admin: true
    }));

  server.get('/user',
    bridge(users.authenticatedUser));

  server.patch('/user',
    bridge(users.updateAuthenticatedUser));

  */

};


function ping(req, res) {
  // must return 200 for ELB health check to work
  res.send(200, {});
}

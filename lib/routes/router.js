'use strict';

/** @param {Restify} server */
module.exports = function(server) {
  server.get('/', ping);
  server.head('/', ping);

};

function ping(req, res) {
  // must return 200 for ELB health check to work
  res.send(200, {});
}

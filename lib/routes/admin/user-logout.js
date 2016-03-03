var passport = require('passport');
var logger = require('../../util/logger.js');

module.exports = function (app) {
  app.get('/logout',
    logout);
};

function logout(req, res, next) {
  req.logout();
  res.redirect('/login');
}
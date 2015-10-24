var LocalStrategy = require('passport-local').Strategy;
var user_handler = require('../handlers/user-handler.js');

module.exports = strategize;

function strategize() {
  return new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, user_handler.getAuthenticated);
}
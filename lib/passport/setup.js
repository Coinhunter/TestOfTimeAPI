var passport = require('passport');
var strategize = require('./strategize.js');
var serialize = require('./serialize.js');
var deserialize = require('./deserialize.js');

module.exports = setup;

function setup(app) {
  var strategy = strategize();
  passport.use(strategy);
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
}
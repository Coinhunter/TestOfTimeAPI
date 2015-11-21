var User = require('../models/user.js');

module.exports = deserializeUser;

function deserializeUser(id, done) {
  User.findById(id, done);
}

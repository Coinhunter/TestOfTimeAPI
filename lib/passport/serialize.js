module.exports = serializeUser;

function serializeUser(user, done) {
  done(null, user._id.toString());
}

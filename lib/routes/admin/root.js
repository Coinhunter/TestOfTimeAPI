var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

/**
 * Simply post back the authenticated user if accessing this route.
 * Basically just using this for login-verification. If not logged in redirect to login.
 */
module.exports = function (app) {
  app.get('/',
    ensureLoggedIn('/login'), function (req, res) {
    	res.render('/', {user: req.user});
    });
};
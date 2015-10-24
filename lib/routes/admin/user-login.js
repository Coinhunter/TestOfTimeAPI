var passport = require('passport');
var ensure_logged_out = require('connect-ensure-login').ensureLoggedOut('/questions');
var logger = require('../../util/logger.js');

module.exports = function (app) {
  app.get('/login',
    ensure_logged_out,
    show_login_form);

  app.post('/login',
    ensure_logged_out,
    authenticate);
};

function show_login_form(req, res, next) {
  res.render('login');
}

function authenticate(req, res, next) {
  var email = req.body.email;
  passport.authenticate('local', function (err, user) {
    if (user && !err) {
      req.login(user, function (err) {
        if (!err) {
          logger.info('User %s logged in', email);
          if (req.session && req.session.returnTo) {
            res.redirect(req.session.returnTo);
          } else {
            res.redirect('/questions');
          }
        } else {
          next(err);
        }
      });
    } else {
      console.log(err);
      logger.info('Failed login attemt with email %s', email);
      res.redirect('/login');
    }
  })(req, res, next);
}

module.exports = function (options) {
  var roles = ['editor', 'admin'];
  var lvl;
  var url;

  if (typeof options == 'string') {
    lvl = options;
  } else if (options) {
    lvl = options.role;
    url = options.redirectTo;
  }

  lvl = roles.indexOf(lvl);

  function ensureRole(req, res, next) {
    var user = req.user;
    var role = user && user.role;
    if (roles.indexOf(role) >= lvl) {
      next();
    } else {
      if (url) {
        res.redirect(url);
      } else {
        res.sendStatus(401);
      }
    }
  }

  return ensureRole;
};
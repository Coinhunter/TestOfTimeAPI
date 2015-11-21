module.exports = expose_user;

function expose_user(req, res, next) {
  res.locals = res.locals || {};
  res.locals.user = req.user;
  next();
}

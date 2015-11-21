var routes = [
  './admin/root.js',
  './admin/user-login.js'
].map(require);

module.exports = function (app) {
  routes.forEach(function (route) {
    route(app);
  });
};

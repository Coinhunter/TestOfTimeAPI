var routes = [
  './admin/card-list.js',
  './admin/card-create.js'
].map(require);

module.exports = function (app) {
  routes.forEach(function (route) {
    route(app);
  });
};

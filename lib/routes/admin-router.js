var routes = [
  './admin/card-list.js'
].map(require);

module.exports = function (app) {
  routes.forEach(function (route) {
    route(app);
  });
};

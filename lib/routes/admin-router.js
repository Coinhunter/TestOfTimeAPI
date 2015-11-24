var routes = [
  './admin/card-list.js',
  './admin/card-create.js',
  './admin/card-delete.js',
  './admin/categories-list.js',
  './admin/category-delete.js'
].map(require);

module.exports = function (app) {
  routes.forEach(function (route) {
    route(app);
  });
};

var routes = [
  './admin/card-list.js',
  './admin/card-create.js',
  './admin/card-delete.js',
  './admin/categories-list.js',
  './admin/category-delete.js',
  './admin/category-create.js'
].map(require);

module.exports = function (app) {
  routes.forEach(function (route) {
    route(app);
  });
};

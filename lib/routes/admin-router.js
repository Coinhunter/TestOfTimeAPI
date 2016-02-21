var routes = [
  './admin/card-list.js',
  './admin/card-create.js',
  './admin/card-delete.js',
  './admin/card-edit.js',
  './admin/card-load.js',
  './admin/card-export.js',
  './admin/categories-list.js',
  './admin/category-delete.js',
  './admin/category-create.js',
  './admin/user-list.js',
  './admin/user-create.js',
  './admin/user-delete.js',
  './admin/user-login.js'
].map(require);

module.exports = function (app) {
  routes.forEach(function (route) {
    route(app);
  });
};

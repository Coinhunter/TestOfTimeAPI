var routes = [
  './admin/card-list.js',
  './admin/card-create.js',
  './admin/card-delete.js',
  './admin/card-edit.js',
  './admin/card-import.js',
  './admin/card-export.js',
  './admin/categories-list.js',
  './admin/category-delete.js',
  './admin/category-create.js',
  './admin/user-list.js',
  './admin/user-create.js',
  './admin/user-delete.js',
  './admin/user-login.js',
  './admin/user-logout.js',
  './admin/setup.js',
  './admin/user-profile.js',
  './admin/user-signup.js',
  './admin/user-edit.js'
].map(require);

module.exports = function (app) {
  routes.forEach(function (route) {
    route(app);
  });
};

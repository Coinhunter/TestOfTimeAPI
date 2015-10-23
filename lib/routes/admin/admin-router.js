var routes = [
  './admin/root.js',

  './admin/user-login.js',
  './admin/user-logout.js',
  './admin/user-forgot-password.js',

  './admin/user-list.js',
  './admin/user-create.js',
  './admin/user-invite.js',
  './admin/user-show.js',
  './admin/user-edit.js',
  './admin/user-delete.js',

  './admin/guide-list.js',
  './admin/guide-create.js',
  './admin/guide-show.js',
  './admin/guide-edit.js',
  './admin/guide-delete.js',
  './admin/guide-map-edit.js',
  './admin/guide-review-status.js',
  './admin/guide-published-status.js',
  './admin/guide-typeahead.js',

  './admin/5x-create.js',
  './admin/5x-edit.js',
  './admin/5x-delete.js',
  './admin/5x-map-edit.js',
  './admin/5x-list.js'
].map(require);

module.exports = function (app) {
  routes.forEach(function (route) {
    route(app);
  });
};

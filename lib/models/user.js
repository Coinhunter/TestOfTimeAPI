'use strict';

var db = require('../db.js'),
    Schema = require('mongoose').Schema,
    schema;

schema = new Schema({

  // Public id
  id: { type: String, required: true },

  // Role, admin, editor
  role: { type: String, required: true},

  // Email.
  email: { type: String, required: true },

  email_verified: { type: Boolean, required: true, default: false },

  // Password hashed with bcrypt.
  hash: { type: String, required: true },

  // Document modification timestamps
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }

}, {
  // Enable autoIndex for simplicity (until we need scheduled indexing)
  autoIndex: true
});


// Index used for auth, see isUserAuthorized in user-handler.
schema.index({
  email: 1
}, {
  unique: true
});


// Index used for auth, see isUserAuthorized in user-handler.
schema.index({
  'projects.project': 1
}, {
  background: true
});


/**
 * Model for a user.
* @type {Mongoose.Model}
 */
module.exports = db.model('User', schema);

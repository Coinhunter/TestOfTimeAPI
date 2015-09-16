'use strict';

var db = require('../db.js'),
    Schema = require('mongoose').Schema,
    schema;


schema = new Schema({

  // Public id
  id: { type: String, required: true },

  // Full name. Used when committing to git.
  name: { type: String, required: true },

  // Email. Used for login and when committing to git.
  email: { type: String, required: true },

  email_verified: { type: Boolean, required: true, default: false },

  // Password hashed with bcrypt.
  hash: { type: String, required: true },

  // Grants admin access unrelated to projects.
  admin: { type: Boolean, required: true, default: false },

  projects: [
    {
      project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
      access: { type: String, required: true, enum: ['read', 'translate', 'write', 'admin'] }
    }
  ],

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

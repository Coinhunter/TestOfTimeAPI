'use strict';

var db = require('../db.js'),
    Schema = require('mongoose').Schema,
    schema;

schema = new Schema({
  token: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now }
}, {
  // Enable autoIndex for simplicity (until we need scheduled indexing)
  autoIndex: true
});

// Index used for automatic deletion after time.
schema.index({
  created_at: 1
}, {
  expireAfterSeconds: 60
});

/**
 * Model for a token.
* @type {Mongoose.Model}
 */
module.exports = db.model('UserToken', schema);

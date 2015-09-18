'use strict';

var db = require('../db.js'),
    Schema = require('mongoose').Schema,
    schema;

schema = new Schema({

  // Question.
  question: { type: String, required: true },

  // Year.
  year: { type: Number, required: true },

  // Document modification timestamps
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }

}, {
  // Enable autoIndex for simplicity (until we need scheduled indexing)
  autoIndex: true
});

/**
 * Model for a user.
* @type {Mongoose.Model}
 */
module.exports = db.model('Card', schema);

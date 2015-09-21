'use strict';

var db = require('../db.js'),
    Schema = require('mongoose').Schema,
    schema;

schema = new Schema({

  categories: { type: Array, required: true },

  // Document modification timestamps
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }

});

module.exports = db.model('Category', schema);

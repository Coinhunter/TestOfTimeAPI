'use strict';

/**
 * Handler that mainly reads and writes from card collection.
 * @type {Object}
 */

var CategoryModel = require('../models/categories.js'),
    validator = require('./category-validator.js'),
    logger = require('../util/logger.js');

/**
 * Converts input params to an actual Card mongoose object.
 * @param {Object} params Parameters to use when populating card.
 * @param {Function} callback Invoked with [err, card].
 */
exports.convertParamsToCategory = function(params, callback) {

  params = validator.validateAddParams(params);

  if (params.err) {
  	logger.error(params.err);
    setImmediate(callback, params.err);
    return;
  }

  var category = new CategoryModel(params);
  callback(null, category);
}

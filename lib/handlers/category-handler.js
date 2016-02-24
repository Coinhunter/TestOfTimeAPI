'use strict';

var categoryCreator = require('./category-create.js'),
	CategoryModel = require('../models/categories.js'),
	logger = require('../util/logger.js'),
	validator = require('./category-validator'),
	PUBLIC_CATEGORIES_FIELDS = 'category _id';

/**
 * Adds a category to the categories collection document.
 * @param {User} au The authenticated user.
 * @param {Object} params Request paramseters: params.category.
 * @param {function(err, status, json)} callback.
 */
exports.add = function(authenticatedUser, params, callback) {
	categoryCreator.convertParamsToCategory(params, function(err, category) {
		if (err) {
	      callback(err);
	      return;
	    }

		category.save(function(err, category) {
	      if (err) {
	        callback(err);
	        return;
	      }
	      callback(null, {message: 'Successfully inserted ' + params.category });
	    });
	});
};

/**
 * @param {User} au The authenticated user
 * @param {Object} params Request params
 * @param {function(err, status, json)} callback
 */
exports.list = function(au, params, callback) {
	if (params.err) {
		setImmediate(callback, params.err);
		return;
	}

	var query = CategoryModel.find({}, PUBLIC_CATEGORIES_FIELDS, { lean: true });

	query.exec(function(err, result) {
		if (err) {
			logger.error('Internal error: ' + err);
			callback(err, 500, {err: '500'});
		}
		else {
			callback(null, 200, result);
		}
	});
};

/**
 * @param {User} au The authenticated user
 * @param {Object} params Request params
 * @param {function(err, status, json)} callback
 */
exports.remove = function(au, params, callback) {
  console.log(params.category);
  var query;
  if (params.err) {
    setImmediate(callback, params.err);
  }

  query = CategoryModel.remove({ category: params.category });
  query.exec(function(err, result) {
    if (err) {
      logger.error('Internal error: ' + err);
      callback(err, 500, {err: '500'});
    }
    else {
      callback(null, 200, result);
    }
  });
};

exports.categoryExists = function(category, callback) {
	var query = CategoryModel.find({category: category});
	query.exec(function(err, result) {
		if (err) {
			callback(err);
		}
		else {
			if (result.length === 0) {
				callback(null, false);
			} else {
				callback(null, true);
			}
		}
	});
};







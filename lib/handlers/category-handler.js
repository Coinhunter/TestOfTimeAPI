'use strict';

var CategoryModel = require('../models/categories.js'),
	logger = require('../util/logger.js'),
	validator = require('./category-validator'),
	PUBLIC_CATEGORIES_FIELDS = 'categories';

/**
 * Adds a category to the categories collection document.
 * @param {User} au The authenticated user.
 * @param {Object} params Request paramseters: params.category.
 * @param {function(err, status, json)} callback.
 */
exports.add = function(authenticatedUser, params, callback) {

	validator.validateAddParams(params);
	if (params.err) {
		setImmediate(callback, params.err);
		return;
	}

	var category = params.category;
	var update = { $addToSet: { categories: category } };
	CategoryModel.findOneAndUpdate(null, update, {upsert: true}, function (err, result) {
		if(err) {
			callback(err);
		} else {
			callback(null, {message: 'Successfully inserted ' + params.category });
		}
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
			if(result.length > 0) {
				result = result[0].categories;
				callback(null, 200, result);				
			} else {
				callback(null, 200, []);
			}
		}
	});
};


exports.remove = function(au, params, callback) {
  console.log(params.category);

  var query;

  if (params.err) {
    setImmediate(callback, params.err);
  }

  query = CategoryModel.update({}, {$pull: { 'categories': params.category } });

  query.exec(function(err, result) {
    if (err) {
      logger.error('Internal error: ' + err);
      callback(err, 500, {err: '500'});
    }
    else {
      callback(null, 200, result);
    }
  });
}
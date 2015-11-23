'use strict';

var cardCreator = require('./card-create.js'),
    CardModel = require('../models/card.js'),
    PUBLIC_CARD_FIELDS = 'question year category _id',
    logger = require('../util/logger.js');

/**
 * @param {User} au The authenticated user
 * @param {Object} params Request params
 * @param {function(err, status, json)} callback
 */
exports.create = function(au, params, callback) {
  cardCreator.convertParamsToCard(params, function(err, card) {
    if (err) {
      callback(err);
      return;
    }

    card.save(function(err, card) {
      if (err) {
        callback(err);
        return;
      }

      callback(null, 201, {
        question: card.question,
        year: card.year,
        category: card.category,
        created_at: card.created_at,
        updated_at: card.updated_at
      });
    });
  });
};

/**
 * @param {User} au The authenticated user
 * @param {Object} params Request params
 * @param {function(err, status, json)} callback
 */
exports.list = function(au, params, callback) {
  var query;

  if (params.err) {
    setImmediate(callback, params.err);
    return;
  }

  query = CardModel.find({},
    PUBLIC_CARD_FIELDS,
    { lean: true });

  if (params.limit) {
    query.limit(params.limit);
  }

  if (params.category) {
    query.where('category').equals(params.category);
  }

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

exports.remove = function(au, params, callback) {
  console.log('Delete card in card-handler params:');
  console.log(params.card_id);

  var query;

  if (params.err) {
    setImmediate(callback, params.err);
  }

  query = CardModel.remove({ _id: params.card_id });

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



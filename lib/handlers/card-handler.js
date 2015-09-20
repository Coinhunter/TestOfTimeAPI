'use strict';

var cardCreator = require('./card-create.js'),
    CardModel = require('../models/card.js'),
    PUBLIC_CARD_FIELDS = 'question year';

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

  query.exec(function(err, result) {
    if (err) {
      console.log('Internal error...');
      callback(err, 500, {err: '500'});
    }
    else {
      callback(null, 200, result);
    }
  });
};



'use strict';

var cardCreator = require('./card-create.js'),
    CardModel = require('../models/card.js'),
    logger = require('../util/logger.js'),
    CardModel = require('../models/card.js'),
    db = require('../db.js'),
    jsonfile = require('jsonfile'),
    fs = require("fs"),
    card_util = require('../util/cardutils.js'),
    category_handler = require('./category-handler.js'),
    ObjectID = require('mongodb').ObjectID;

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
        year: card.year,
        category: card.category,
        created_at: card.created_at,
        updated_at: card.updated_at,
        _id: card._id
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
    card_util.getPublicCardFields(),
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

/**
 * @param {User} au The authenticated user
 *
 */
exports.apiList = function(au, params, callback) {
  var query = CardModel.find({},
    card_util.getPublicCardFields(),
    { lean: true });
  
  if(!(params.category == 'all')) {
    query.where('category').equals(params.category);
  }

  if(params.language) {
    var lan = 'languages.' + params.language;
    query.where(lan).ne('');
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

/**
 * @param {User} au The authenticated user
 * @param {Object} params Request parameter _id to look up card.
 * @param {function(err, status, json)} callback
 */
exports.find = function(au, params, callback) {
  
  var query;
  if (params.err) {
    setImmediate(callback, params.err);
    return;
  }
  
  query = CardModel.findOne(
    {_id: params._id },
    card_util.getPublicCardFields(),
    { lean: true });
  
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
 * @param {Object} params Request parameter _id to identify card.
 * @param {function(err, status, json)} callback
 */
exports.remove = function(au, params, callback) {
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

/**
 * @param {User} au The authenticated user
 * @param {Object} card the card to be updated
 * @param {function(err, status, updated_card)} callback
 */
exports.update = function(au, card, callback) {
  CardModel.findOneAndUpdate({
    _id: card._id
  }, {
    $set: {
      year: card.year,
      category: card.category,
      updated_at: Date.now(),
      languages: card.languages
    }
  }, function (err, card) {
    if (err) {
      callback(err, 500, null);
    } else {
      callback(null, 200, card);      
    }
  });
}
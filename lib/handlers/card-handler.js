'use strict';

var cardCreator = require('./card-create.js'),
    CardModel = require('../models/card.js'),
    PUBLIC_CARD_FIELDS = 'question year category _id',
    logger = require('../util/logger.js'),
    CardModel = require('../models/card.js'),
    db = require('../db.js'),
    jsonfile = require('jsonfile'),
    fs = require("fs");

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
    PUBLIC_CARD_FIELDS,
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

}

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

exports.update = function(au, card, callback) {
  CardModel.findOneAndUpdate({
    _id: card._id
  }, {
    $set: {
      question: card.question,
      year: card.year,
      category: card.category,
      updated_at: Date.now()
    }
  }, function (err, card) {
    if (err) {
      callback(err, 500, null);
    } else {
      callback(null, 200, card);      
    }
  });
}

exports.loadcards = function(au, callback) {
  var json = fs.readFileSync('./res/cards.json');
  var cardArray = JSON.parse(json);
  db.connect(function(err) {
    if (err) {
      console.log('Error connecting to database');
      callback(err);
    } else {
    for (var i = 0 ; i < cardArray.length ; i++) { 
      cardCreator.convertParamsToCard(
        {
          question: cardArray[i].question,
          year: cardArray[i].year,
          category: cardArray[i].category 
        },
        function(err, returned_card) {
          if (err) {
            console.log('Error converting params to card');
          } else {

            var card = new CardModel(returned_card);
            card.save(function (err, card) {
              if (err) {
                console.error(err);
              }
              else {
                console.log('Card created...');
              }
            });
          }
        }
      );
      if (i === cardArray.length -1) {
        callback(null, 200);        
      }
    }
  }
  });
}

exports.expcards = function(au, params, callback) {
  var query;
  query = CardModel.find(
    {},
    PUBLIC_CARD_FIELDS,
    { lean: true }
  );

  if (params.category.valueOf() != 'all') {
    query.where('category').equals(params.category);
  }
  
  query.exec(function(err, result) {
    if (err) {
      callback(err);
    }
    else {
      var saveErr = savefile(params.filename, result);
      if (saveErr) {
        callback(saveErr);
      } else {
        callback(null);
      }
    }
  });
}

exports.listresfiles = function(au, callback) {
  fs.readdir('./res/cards', function(err, files) {
    if (err) {
      callback(err, 500, null);
    } else {
      var modfiles = [];
      files.forEach(function(file) {
        modfiles.push(file.split('.')[0]);
      });
      callback(null, 200, modfiles);
    }
  });
}

function savefile(filename, file) {
  jsonfile.writeFile('./res/cards/' + filename + '.json', file, function (err) {
    if (err) {
      if(typeof err == "undefined") {
        return null;
      } else {
        return err;
      }
    }
    return null;
  });
}

exports.removefile = function(filename) {
  fs.unlink('./res/cards/' + filename + '.json');
}

var logger = require('../util/logger.js');
var db = require('../db.js');
var fs = require("fs");
var jsonfile = require('jsonfile');
var card_util = require('../util/cardutils.js');
var card_handler = require('./card-handler.js');
var category_handler = require('./category-handler.js');
var CardModel = require('../models/card.js');
var cardCreator = require('./card-create.js');


/**
 * @param {User} au The authenticated user
 * @param {function(err, statuscode)} callback
 */
exports.loadFromFile = function(au, filename, callback) {
  var json = fs.readFileSync('./res/cards/' + filename + '.json');
  var cardArray = JSON.parse(json);
  db.connect(function(err) {
    if (err) {
      console.log('Error connecting to database');
      callback(err);
    } else {
      
      loadMissingCategories(cardArray);

      var numberOfCards = cardArray.length;
      for (var i = 0 ; i < numberOfCards ; i++) {

        findCardWithId(cardArray[i], function(err, sentCard, result) {
          if (err) {
            console.log('Error fetching card from database.');
          } 
          else {
            if (result === null) {

              cardCreator.convertParamsToCard(
                {
                  _id: sentCard._id,
                  question: sentCard.question,
                  year: sentCard.year,
                  category: sentCard.category 
                },
                function(err, returned_card) {
                  if (err) {
                    console.log('Error converting params to card');
                  } else {

                    var card = new CardModel(returned_card);
                    
                    card.save(function (err, card) {
                      if (err) {
                        console.log(err);
                      }
                      else {
                        //Created a card.
                      }
                    });
                  }
                }
              );
            } else {
              //Found matching document. Doing nothing.
            }
          }
        });
        
        // After we're done going over the cards, we send the callback off.
        if ( i === numberOfCards - 1 ) {
          callback(null, 200);
        }
      }
    }
  });
};

exports.exportCardsToFile = function(au, params, callback) {
  var query;
  query = CardModel.find(
    {},
    card_util.getPublicCardFields(),
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

exports.listResourceFiles = function(au, callback) {
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

exports.removeFile = function(filename) {
  fs.unlink('./res/cards/' + filename + '.json');
}

function saveFile(filename, file) {
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

function findCardWithId(card, callback) {
  CardModel.findById(card._id, function(err, result) {
    if (err) {
      callback(err, card, null);
    } else {
      if (!result) {
        callback(null, card, null);
      } else {
        callback(null, card, result);
      }
    }
  });
}

function loadMissingCategories(cardArray) {
  var cardCategories = [];
  for (var j = 0 ; j < cardArray.length ; j++) {
    if(cardCategories.indexOf(cardArray[j].category) == -1) {
      cardCategories.push(cardArray[j].category);
    }
  }
  for (var catIt = 0 ; catIt < cardCategories.length ; catIt++) {
    checkCateogryAndAddIfMissing(cardCategories[catIt]);
  }
}

function checkCateogryAndAddIfMissing(category) { 
  category_handler.categoryExists(category, function(err, found) {
    if (!err) {
      if (!found) {
        category_handler.add(null, { category: category}, function(err2, result) {
        }); 
      } 
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
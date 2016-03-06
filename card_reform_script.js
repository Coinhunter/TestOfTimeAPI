var cardCreator = require('./lib/handlers/card-create.js'),
    config = require('config'),
    mongoose = require('mongoose'),
    CardModel = require('./lib/models/card.js'),
    db = require('./lib/db.js'),
    cardHandler = require('./lib/handlers/card-handler.js');


cardHandler.list(null, {}, function(err, status, result) {
  if (err) {
      return;
  } else {
    var i = 0;
    for ( i ; i < result.length ; i++ ) {
      CardModel.findOneAndUpdate({
        _id: result[i]._id
      }, {
        $set: {
          languages: { en: result[i].question, sv: '' }
        }
      }, function (err, card) {
        if (err) {
          console.log('Error!');
        } else {
          console.log('Success!');
        }
      });
    }
  }

});


/*
cardHandler.list(null, {}, function(err, status, result) {
  if (err) {
      return;
  } else {
    var i = 0;
    for ( i ; i < result.length ; i++ ) {
      CardModel.findOneAndUpdate({
        _id: result[i]._id
      }, {
        $set: {
          languages: { en: '', sv: '' } 
        }
      }, function (err, card) {
        if (err) {
          console.log('Error!');
        } else {
          console.log('Success!');
        }
      });
    }
  }

});
*/
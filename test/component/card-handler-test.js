var mongoose = require('mongoose');
var Config = require('config');
var should = require('should');
var card_handler = require('../../lib/handlers/card-handler.js');
var assert = require('assert');
var Card = require('../../lib/models/card.js');

describe('Card Handler Component Test', function () {

  before(function (done) {
    mongoose.disconnect(function () {
      mongoose.connect(Config.mongo.uri, done);
    });
  });

  after(function (done) {
    Card.remove({}, function () {
      mongoose.disconnect(done);
    });
  });

  beforeEach(function (done) {
    Card.remove({}, function () {
      done();
    });
  });


  describe('Creating card', function () {
    
    it('should create card if all required parameters are supplied', function (done) {
      card_handler.create(null, {
        year: 1900,
        category: 'Other',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) { 
          should.not.exist(err);
          should.exist(card);
          card.year.should.equal(1900);
          card.category.should.equal('Other');
          card.languages.en.should.equal('The year 1900');
          done();
        });
    });

    it('should not create a card if year parameter is missing', function (done) {
      card_handler.create(null, {
        category: 'Other',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) { 
          should.exist(err);
          should.not.exist(card);
          err.should.equal('Missing year.');
          done();
        });
    });

    it('should not create a card if category parameter is missing', function (done) {
      card_handler.create(null, {
        year: 1900,
        languages: { en: 'The year 1900' }
      }, function (err, status, card) { 
          should.exist(err);
          should.not.exist(card);
          err.should.equal('Missing category.');
          done();
        });
    });

    it('should not create a card if languages parameter is missing', function (done) {
      card_handler.create(null, {
        year: 1900,
        category: 'Other'
      }, function (err, status, card) { 
          should.exist(err);
          should.not.exist(card);
          err.should.equal('Must have a question in either swedish or english.');
          done();
        });
    });

  });

  describe('Listing cards', function () {

    it('should not return a card object if there are no cards', function (done) {
    	card_handler.list(null, {}, function(err, statuscode, cards) {
        assert.equal(0, cards.length);
        done();
    	});
    });

    it('should only return cards in specified category', function (done) {
      card_handler.create(null, {
        year: 1,
        category: 'Other',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) {
        card_handler.create(null, {
          year: 2,
          category: 'Other2',
          languages: { en: 'The year 1900' }
        }, function (err2, status2, card2) {
            card_handler.create(null, {
              year: 3,
              category: 'Other3',
              languages: { en: 'The year 1900' }
            }, function (err3, status3, card3) {

              card_handler.list(null, { category: 'Other' }, function(err, statuscode, cards) {
                assert.equal(1, cards.length);
                should.equal(cards[0].category, 'Other');
                done();
              });        

            });
          });
        });
    });

    it('should not return any cards if category is empty', function (done) {
      card_handler.create(null, {
        year: 1,
        category: 'Other1',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) {
        card_handler.create(null, {
          year: 2,
          category: 'Other2',
          languages: { en: 'The year 1900' }
        }, function (err2, status2, card2) {
            card_handler.create(null, {
              year: 3,
              category: 'Other3',
              languages: { en: 'The year 1900' }
            }, function (err3, status3, card3) {

              card_handler.list(null, { category: 'Other' }, function(err, statuscode, cards) {
                assert.equal(0, cards.length);
                done();
              });        

            });
          });
        });
    });

    it('should return limit number of cards', function (done) {
      card_handler.create(null, {
        year: 1,
        category: 'Other1',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) {
        card_handler.create(null, {
          year: 2,
          category: 'Other2',
          languages: { en: 'The year 1900' }
        }, function (err2, status2, card2) {
            card_handler.create(null, {
              year: 3,
              category: 'Other3',
              languages: { en: 'The year 1900' }
            }, function (err3, status3, card3) {

              card_handler.list(null, { limit: 1 }, function(err, statuscode, cards) {
                assert.equal(1, cards.length);
                done();
              });        

            });
          });
        });
    });

    it('should return limit number of cards in category if both are specified', function (done) {
      card_handler.create(null, {
        year: 1,
        category: 'Other',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) {
        card_handler.create(null, {
          year: 2,
          category: 'Other',
          languages: { en: 'The year 1900' }
        }, function (err2, status2, card2) {
            card_handler.create(null, {
              year: 3,
              category: 'Other',
              languages: { en: 'The year 1900' }
            }, function (err3, status3, card3) {

              card_handler.list(null, { limit: 1, category: 'Other' }, function(err, statuscode, cards) {
                assert.equal(1, cards.length);
                done();
              });        

            });
          });
        });      
    });

  });

  describe('Looking up a card', function () {

    it('should find a card by _id', function (done) {
      card_handler.create(null, {
        year: 1900,
        category: 'Other',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) {
        should.not.exist(err);
        should.exist(card);
        card.should.have.property('year', 1900);
        card.should.have.property('languages');
        card.languages.should.have.property('en', 'The year 1900');
        card.should.have.property('category', 'Other');
        card.should.have.property('created_at');
        card.should.have.property('updated_at');

        card.year.should.be.a.Number;
        card.category.should.be.a.String;
        card.languages.should.be.an.Object;
        card.languages.en.should.be.a.String;
        card.created_at.should.be.a.Date;
        card.updated_at.should.be.a.Date;

        card_handler.find(null, {_id: card._id}, function(err, statuscode, foundcard) {
          should.equal(err, null);
          should.exist(statuscode);
          statuscode.should.equal(200);
          should.exist(foundcard);
          foundcard.should.have.property('year', 1900);
          foundcard.should.have.property('_id');
          done();
        });
      });
    });

  });

  describe('Updating a card', function() {
    
    it('should update year', function (done) {
      card_handler.create(null, {
        year: 1900,
        category: 'Other',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) {
          should.not.exist(err);
          status.should.equal(201);
          should.exist(card);
          card.year.should.equal(1900);
          card.year = 2000;
          card_handler.update(null, card, function (updateErr, updateStatus, updateCard) {
            should.not.exist(updateErr);
            updateStatus.should.equal(200);
            should.exist(updateCard);
            updateCard.year.should.equal(2000);
            done();
          });
        });
    });

    it('should update questions', function (done) {
      card_handler.create(null, {
        year: 1900,
        category: 'Other',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) {
          should.not.exist(err);
          status.should.equal(201);
          should.exist(card);
          card.languages.en = 'The year 1900 updated';
          card.languages.sv = 'Året var 1900 tillagt';
          card_handler.update(null, card, function (updateErr, updateStatus, updateCard) {
            should.not.exist(updateErr);
            updateStatus.should.equal(200);
            should.exist(updateCard);
            updateCard.languages.en.should.equal('The year 1900 updated');
            updateCard.languages.sv.should.equal('Året var 1900 tillagt');
            done();
          });
        });
    });

    it('should update category', function (done) {
      card_handler.create(null, {
        year: 1900,
        category: 'Other',
        languages: { en: 'The year 1900' }
      }, function (err, status, card) {
          should.not.exist(err);
          status.should.equal(201);
          should.exist(card);
          card.category = 'Another';
          card_handler.update(null, card, function (updateErr, updateStatus, updateCard) {
            should.not.exist(updateErr);
            updateStatus.should.equal(200);
            should.exist(updateCard);
            updateCard.category.should.equal('Another');
            done();
          });
        });
    });

    it('should update updated_at', function (done) {
      card_handler.create(null, {
        year: 1900,
        category: 'Other',
        languages: { en: 'The year 1900' }
      }, function (e1, s1, card1) {
          should.not.exist(e1);
          should.exist(card1);
          card_handler.update(null, card1, function (e2, s2, card2) {
            should.not.exist(e2);
            should.exist(card2);
            card1.updated_at.should.not.equal(card2.updated_at);
            done();
          });
        });
    });

  });
});







var mongoose = require('mongoose');
var Config = require('config');
var should = require('should');
var card_handler = require('../../lib/handlers/card-handler.js');
var assert = require('assert');
var Card = require('../../lib/models/card.js');

describe('Card Handler Unit Test', function () {

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


  describe('Listing cards', function () {

    it('should return a card object', function () {
    	card_handler.list(null, {}, function(err, statuscode, cards) {
    		//should.exist(s);
        assert.equal(0, cards.length);
        done();
    	});


		/*
		var s = guide_handler.publishButtonType(role, isCreatingNew, ready_for_review, published);
		should.exist(s);
		s.should.be.a.String;
		s.should.eql('publish');
		*/
    });


  });

  describe('Looking up a card', function () {

      it('should find a card by _id', function (done) {
        var year = 1900,
            category = 'Other',
            question = 'The year 1900';

        card_handler.create(null, {
          year: year,
          category: category,
          question: question
        }, function (err, status, card) {
          should.not.exist(err);
          should.exist(card);
          card.should.have.property('year', year);
          card.should.have.property('question', question);
          card.should.have.property('category', category);
          card.should.have.property('created_at');
          card.should.have.property('updated_at');

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

});
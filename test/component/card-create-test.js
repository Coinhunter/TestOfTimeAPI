var mongoose = require('mongoose');
var Config = require('config');
var should = require('should');
var cardCreate = require('../../lib/handlers/card-create.js');
var assert = require('assert');
var Card = require('../../lib/models/card.js');

describe('Card Create Component Test', function () {

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

    it('should convert parameters to a card', function (done) {
		var year = 1900,
        	category = 'Other',
        	question = 'The year 1900';

		var params = {
			year: year,
			category: category,
			question: question
		};    	

    	cardCreate.convertParamsToCard(params, function (err, card) {
    		should.not.exist(err);
    		should.exist(card);
    		card.should.have.property('year', year);
    		card.should.have.property('category', category);
    		card.should.have.property('question', question);
			card.should.have.property('created_at');
        	card.should.have.property('updated_at');
    		done();
    	});

    });

  	xit('should not create a card if year is not a number');
  	xit('should not create a card if category is not a string');
  	xit('should not create a card if category is a zero-length string');
  	xit('should not create a card if question is not a string');
  	xit('should not create a card if question is a zero-length string');
  	xit('should clean out excess parameters');

  });

});
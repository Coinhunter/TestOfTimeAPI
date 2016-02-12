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


  xdescribe('Creating card', function () {

    xit('should create card if all required parameters are supplied');
    xit('should not create a card if required parameters are missing');
    xit('should not create a card if types of parameters are wrong');

  });

  describe('Listing cards', function () {

    it('should return a card object', function () {
    	card_handler.list(null, {}, function(err, statuscode, cards) {
    		//should.exist(s);
        assert.equal(0, cards.length);
        done();
    	});
    });
    xit('should only return cards in specified category');
    xit('should not return any cards if category is empty');
    xit('should return first 100 cards if limit is not specified');
    xit('should return limit number of cards');
    xit('should return limit number of cards in category if both are specified');
    xit('should return error and status 500 if it cannot connect to database');

  });

  describe('Looking up a card', function () {

    xit('should find a card by _id');
    xit('should have property year as number');
    xit('should have property question as nonempty string');
    xit('should have property category as nonempty string');
    xit('should have property created_at as date');
    xit('should have property updated_at as date');
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

  describe('Updating a card', function() {
    xit('should update year');
    xit('should update question');
    xit('should update category');
    xit('should update updated_at');
  });

  describe('Export cards to file', function() {
    xit('should export cards to a file with specified filename');
    xit('should export cards to an existing file if filename exists');
    xit('should only export the specified category if one is specified');
  });

  describe('Load cards from resource file', function() {
    xit('should load all cards from resource file');
  });

  describe('List Card resource files', function() {
    xit('should list existing files');
  });

  describe('Remove Card resource file', function() {
    xit('should remove the specified resource file');
  });

});










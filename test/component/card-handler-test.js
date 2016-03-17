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

    it('should return a card object', function (done) {
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
      done();
    });

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










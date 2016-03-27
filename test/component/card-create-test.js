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

    it('should convert parameters to a card with language object', function (done) {
      var year = 1900,
        category = 'Other',
        languages = { en: 'The year 1900' };

      var params = {
        year: year,
        category: category,
        languages: languages
      };

      cardCreate.convertParamsToCard(params, function (err, card) {
        should.not.exist(err);
        should.exist(card);
        card.should.have.property('year', year);
        card.should.have.property('category', category);
        card.should.have.property('created_at');
        card.should.have.property('updated_at');
        should.exist(card.languages);
        card.languages.should.have.property('en', 'The year 1900');
        card.languages.should.not.have.property('se');
        done();
      });
    });

    it('should convert parameters to a card with se, en properties', function (done) {
      var year = 1900,
        category = 'Other';

      var params = {
        year: year,
        category: category,
        en: 'The year 1900'
      };

      cardCreate.convertParamsToCard(params, function (err, card) {
        should.not.exist(err);
        should.exist(card);
        card.should.have.property('year', year);
        card.should.have.property('category', category);
        card.should.have.property('created_at');
        card.should.have.property('updated_at');
        should.exist(card.languages);
        card.languages.should.have.property('en', 'The year 1900');
        card.languages.should.not.have.property('se');
        done();
      });
    });

    it('should not create a card if year is not a number', function (done) {
      var year = 'NaN-String',
          category = 'Other',
          params = {
            year: year,
            category: category,
            en: 'The year 1900'
          };
      
      cardCreate.convertParamsToCard(params, function (err, card) {
        should.exist(err);
        should.equal(err, 'Year must be a number.');
        should.not.exist(card);
        done();
      });
    });

    it('should not create a card if category is not a string', function (done) {
      var year = 1900,
          category = {},
          params = {
            year: year,
            category: category,
            en: 'The year 1900'
          };
      
      cardCreate.convertParamsToCard(params, function (err, card) {
        should.exist(err);
        should.equal(err, 'Category must be non-empty string.');
        should.not.exist(card);
        done();
      });
    });

    it('should not create a card if category is a zero-length string', function (done) {
      var year = 1900,
          category = '',
          params = {
            year: year,
            category: category,
            en: 'The year 1900'
          };
      
      cardCreate.convertParamsToCard(params, function (err, card) {
        should.exist(err);
        should.equal(err, 'Category must be non-empty string.');
        should.not.exist(card);
        done();
      });
    });

    it('should not create a card if en/se is not a string', function (done) {
      var year = 1900,
          category = '',
          params = {
            year: year,
            category: category,
            en: 42,
            se: 'Valid question'
          };
      
      cardCreate.convertParamsToCard(params, function (err, card) {
        should.exist(err);
        should.equal(err, 'Must have a question in either swedish or english.');
        should.not.exist(card);
        done();
      });
    });

    it('should not create a card if se/en is a zero-length string', function (done) {
      var year = 1900,
          category = '',
          params = {
            year: year,
            category: category,
            en: ''
          };
      
      cardCreate.convertParamsToCard(params, function (err, card) {
        should.exist(err);
        should.equal(err, 'Must have a question in either swedish or english.');
        should.not.exist(card);
        done();
      });
    });    

    it('should clean out excess parameters', function (done) {
      var year = 1900,
          category = 'Other',
          params = {
            year: year,
            category: category,
            sv: 'Question',
            extra: {},
            foo: 'bar'
          };
      
      cardCreate.convertParamsToCard(params, function (err, card) {
        should.not.exist(err);
        should.exist(card);
        card.should.have.property('year', year);
        card.should.have.property('category', category);
        card.should.have.property('created_at');
        card.should.have.property('updated_at');
        should.exist(card.languages);
        card.languages.should.have.property('sv', 'Question');
        card.should.not.have.property('extra');
        card.should.not.have.property('foo');
        done();
      });      
    });

  });

});
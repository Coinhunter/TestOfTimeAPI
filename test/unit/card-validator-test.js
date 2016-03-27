var should = require('should');
var assert = require('assert');
var card_validator = require('../../lib/handlers/card-validator.js');

var params = {};

var params_swedish = {};
  
describe('Card Validator Unit Test', function () {

  beforeEach(function (done) {
    params = {};
    params.languages = {};
    params.languages.en = 'This is the question.';
    params.year = 1999;
    params.category = 'Category';
    params.unwanted = 'This should not be in the validated params';

    params_swedish = {};
    params_swedish.languages = {};
    params_swedish.languages.sv = 'Detta är frågan.';
    params_swedish.year = 1999;
    params_swedish.category = 'Category';
    params_swedish.unwanted = 'This should not be in the validated params';    

    done();
  });

  describe('Validate card', function () {

    it('should remove parameters that don\'t belong', function (done) {
      var validated_params = card_validator.validateCreateParams(params);
      validated_params.should.have.property('year', 1999);
      validated_params.should.have.property('category', 'Category');
      validated_params.should.have.property('languages');
      validated_params.languages.should.have.property('en', 'This is the question.');
      should.not.exist(validated_params.unwanted);
      done();
    });

    it('should have an error when missing category field', function (done) {
      delete params.category;
      var validated_params = card_validator.validateCreateParams(params);
      validated_params.should.have.property('err', 'Missing category.');
      done();
    });

    it('should have an error when missing languages field', function (done) {
      delete params.languages;
      var validated_params = card_validator.validateCreateParams(params);
      validated_params.should.have.property('err', 'Must have a question in either swedish or english.');
      done();
    });

    it('should have an error when missing year field', function (done) {
      delete params.year;
      var validated_params = card_validator.validateCreateParams(params);
      validated_params.should.have.property('err', 'Missing year.');
      done();
    });

    it('should have a year which should be a number', function (done) {
      var validated_params = card_validator.validateCreateParams(params);
      should.equal(validated_params.year, 1999);
      validated_params.year.should.be.a.Number;
      done();
    });

    it('should have a languages en field which should be a non-empty string', function (done) {
      var validated_params = card_validator.validateCreateParams(params);
      should.equal(validated_params.languages.en, 'This is the question.');
      validated_params.languages.should.be.an.Object;
      validated_params.languages.en.should.be.a.String;
      validated_params.languages.en.length.should.be.above(0);
      done();
    });

    it('should havea languages sv field which should be a non-empty string', function (done) {
      var validated_params = card_validator.validateCreateParams(params_swedish);
      should.equal(validated_params.languages.sv, 'Detta är frågan.');
      validated_params.languages.should.be.an.Object;
      validated_params.languages.sv.should.be.a.String;
      validated_params.languages.sv.length.should.be.above(0);
      done();
    });

    it('should have a category which should be a non-empty string', function (done) {
    var validated_params = card_validator.validateCreateParams(params);
      should.equal(validated_params.category, 'Category');
      validated_params.category.should.be.a.String;
      validated_params.category.length.should.be.above(0);
      done();     
    });

  });
});
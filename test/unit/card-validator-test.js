var should = require('should');
var assert = require('assert');
var card_validator = require('../../lib/handlers/card-validator.js');

var params = {};
	
describe('Card Validator Unit Test', function () {

  before(function (done) {
	params.question = 'This is the question.';
	params.year = 1999;
	params.category = 'Category';
	params.unwanted = 'This should not be in the validated params';
	done();
  });

  beforeEach(function (done) {
    params = {};
	params.question = 'This is the question.';
	params.year = 1999;
	params.category = 'Category';
	params.unwanted = 'This should not be in the validated params';
	done();
  });

  describe('Validate card', function () {

    it('should remove parameters that don\'t belong', function (done) {
    	var validated_params = card_validator.validateCreateParams(params);
    	validated_params.should.have.property('year', 1999);
    	validated_params.should.have.property('category', 'Category');
    	validated_params.should.have.property('question', 'This is the question.');
    	should.not.exist(validated_params.unwanted);
    	done();
    });

    it('should have an error when missing category field', function (done) {
    	delete params.category;
    	var validated_params = card_validator.validateCreateParams(params);
    	validated_params.should.have.property('err', 'Missing category');
    	done();
    });

    it('should have an error when missing question field', function (done) {
    	delete params.question;
    	var validated_params = card_validator.validateCreateParams(params);
    	validated_params.should.have.property('err', 'Missing question');
    	done();
    });

    it('should have an error when missing year field', function (done) {
    	delete params.year;
    	var validated_params = card_validator.validateCreateParams(params);
    	validated_params.should.have.property('err', 'Missing year');
    	done();
    });

    it('should have a year which should be a number', function (done) {
    	var validated_params = card_validator.validateCreateParams(params);
    	should.equal(validated_params.year, 1999);
    	validated_params.year.should.be.a.Number;
    	done();
    });

    it('should have a question which should be a non-empty string', function (done) {
    	var validated_params = card_validator.validateCreateParams(params);
    	should.equal(validated_params.question, 'This is the question.');
    	validated_params.question.should.be.a.String;
    	validated_params.question.length.should.be.above(0);
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
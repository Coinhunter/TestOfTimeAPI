var mongoose = require('mongoose');
var Config = require('config');
var should = require('should');
var category_handler = require('../../lib/handlers/category-handler.js');
var assert = require('assert');
var Categories = require('../../lib/models/categories.js');

describe('Category Handler Component Test', function () {

  before(function (done) {
    mongoose.disconnect(function () {
      mongoose.connect(Config.mongo.uri, done);
    });
  });

  after(function (done) {
    Categories.remove({}, function () {
      mongoose.disconnect(done);
    });
  });

  beforeEach(function (done) {
    Categories.remove({}, function () {
      done();
    });
  });

  it('should create category', function (done) {
    var params = {
      category: 'Category'
    };

    category_handler.add(null, params, function(err, resp) {
      should.not.exist(err);
      should.exist(resp);
      resp.should.have.property('message', 'Successfully inserted Category');
      done();
    });
  });

  it('should list all categories', function (done) {
    var params = {};

    category_handler.list(null, params, function(err, status, result) {
      should.not.exist(err);
      should.exist(status);
      should.exist(result);
      should.equal(status, 200);

      var createparams = {
        category: 'Category1'
      };
      
      setupCategories();

      category_handler.list(null, params, function(err, status, result) {
        should.equal(result.length, 5);
        should.equal(result[0].category, 'Category0');
        should.equal(result[4].category, 'Category4');
        done();
      });

    });
  });

  it('should remove only specified category when asked to do so', function (done) {
    var params = {};
    setupCategories();
    setTimeout(function() {
      params.category = 'Category3';
      category_handler.remove(null, params, function(err, status, result) {
        should.not.exist(err);
        should.exist(status);
        should.equal(status, 200);

        category_handler.list(null, {}, function(err2, status2, result2) {
          should.not.exist(err2);
          should.exist(status2, 200);
          should.exist(result2);
          should.equal(result2.length, 4);
          should.equal(result2[3].category, 'Category4');
          done();        
        });
      });
    }, 100);
  });

});

function setupCategories() {
  var createparams = {};
  for (var i = 0 ; i < 5 ; i++) {
    createparams.category = 'Category' + i;
    category_handler.add(null, createparams, function(err, resp) {});
  }
}









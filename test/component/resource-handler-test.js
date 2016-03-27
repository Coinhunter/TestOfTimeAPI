var mongoose = require('mongoose');
var Config = require('config');
var should = require('should');
var card_handler = require('../../lib/handlers/card-handler.js');
var resource_handler = require('../../lib/handlers/resource-handler.js');
var assert = require('assert');
var Card = require('../../lib/models/card.js');

describe('Resource Handler Component Test', function () {

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

  describe('Export cards to file', function() {
    xit('should export cards to a file with specified filename');
    xit('should export cards to an existing file if filename exists');
    xit('should only export the specified category if one is specified');
  });

  describe('Load cards from resource file', function() {
    xit('should load all cards from resource file');
  });

  describe('List Card resource files', function() {
    it('should list existing files', function (done) {
      resource_handler.listResourceFiles(null, function(err, status, files) {
        should.not.exist(err);
        status.should.equal(200);
        files.length.should.equal(1);
        done();
      });
    });
  });

  describe('Remove Card resource file', function() {
    xit('should remove the specified resource file');
  });

});
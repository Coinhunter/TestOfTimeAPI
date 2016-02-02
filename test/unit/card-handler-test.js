//var should = require('should');
var card_handler = require('../../lib/handlers/card-handler.js');
var assert = require('assert');

describe('Card Handler Unit Test', function () {

  describe('list', function () {

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

});
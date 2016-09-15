'use strict';

const chai = require('chai');
const expect = chai.expect;
const example = require('../lib/example');

describe('example', function() {
  describe('dummy', function() {
    it('should add 2 numbers', function() {
      expect(example.dummy(2, 3), 'Houston, we have a problem').to.be.equal(5);
    });
  });
});

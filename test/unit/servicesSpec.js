'use strict';

describe('service', function() {

  	// load modules
  	beforeEach(module('spa'));

  	// Test service availability
  	it('check the existence of Problems factory', inject(function(Problems) {
    	expect(Problems).toBeDefined();
    }));
});
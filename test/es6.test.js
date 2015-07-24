'use strict';

var commentRegex = require('comment-regex');
var tests = require('../data-es6').tests;

describe('ES2015 test', function() {

  tests.forEach(function(test) {
    describe('[' + test.category + '] ' + test.name, function() {
      for (var name in test.subtests) {
        var code = getJsCode(test.subtests[name].exec);
        createTestCase(name, code);
      }
    });
  })
});

function getJsCode(fn) {
  return fn.toString().match(/^function\s*\(\)\s*\{\/\**([\S\s]*)\*\//)[1];
}

function createTestCase(name, code) {
  it(name, function() {
    var f = new Function('\'use strict\';' + code);
    var ret = f();
    if (ret !== true) {
      throw new Error(name + ' not pass');
    }
  });
}

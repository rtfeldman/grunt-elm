'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

function testFixture(test, filenames, expectedMessage) {
  test.expect(filenames.length);

  filenames.forEach(function(filename) {
    var actual   = grunt.file.read('tmp/testOutput/test/fixtures/' + filename);
    var expected = grunt.file.read('test/expected/' + filename);

    test.equal(actual, expected, "should compile to the expected " + filename);
  });

  test.done();
}

exports.elm = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  oneFile: function(test) {
    testFixture(test, ["TestHelloWorld.js"]);
  },
  twoFiles: function(test) {
    testFixture(test, ["TestA.js", "TestB.js"]);
  },
};

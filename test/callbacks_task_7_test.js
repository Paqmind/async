const assert = require('chai').assert;
const async = require('async');
const parallel = require('../callbacks/task_7');

describe("Task 7", function() {
  describe("parallel()", function() {
    it("when array of tasks is not empty shoud return ['one', 'two']",
      function() {
      parallel([
        function(callback) {
          setTimeout(function() {
            callback(null, 'one');
          }, 200);
        },
        function(callback) {
          setTimeout(function() {
            callback(null, 'two');
          }, 100);
        }
      ], function(err, res) {
        assert.equal(res, ['one', 'two']);
      });
    });

    it("when no tasks shoud return []", function() {
      parallel([], function(err, res) {
        assert.equal(res, []);
      });
    });

    it("when error in the tasks shoud catch the error", function() {
      parallel([
        function(callback) {
          setTimeout(function() {
            callback('Error', 'one');
          }, 200);
        },
        function(callback) {
          setTimeout(function() {
            callback(null, 'two');
          }, 100);
        }
      ], function(err, res) {
        assert.equal(err, 'Error');
      });
    });
  });
});
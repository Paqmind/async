const assert = require('chai').assert;
const series = require('../callbacks/task_8');

describe("Task 8", function() {
  describe("parallel()", function() {
    it("when array of tasks is not empty shoud return ['one', 'two']",
      function() {
      series([
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
      series([], function(err, res) {
        assert.equal(res, []);
      });
    });

    it("when error in the tasks shoud catch the error", function() {
      series([
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
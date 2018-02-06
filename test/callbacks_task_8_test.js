const assert = require('chai').assert;
const series = require('../callbacks/task_8');

describe("Task 8", function() {
  describe("series()", function() {
    it("when array of tasks is not empty shoud return ['one', 'two']",
      function(done) {
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
        done();
      });
    });

    it("when no tasks shoud return []", function(done) {
      series([], function(err, res) {
        assert.equal(res, []);
      });
    });

    it("when error in the tasks shoud catch the error", function(done) {
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
        done();
      });
    });
  });
});
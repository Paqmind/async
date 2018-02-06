const assert = require('chai').assert;
const waterfall = require('../callbacks/task_9');

describe("Task 9", function() {
  describe("waterfall()", function() {
    it("when array of tasks is not empty shoud return ['one', 'two']",
      function(done) {
      waterfall([
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
      waterfall([], function(err, res) {
        assert.equal(res, []);
        done();
      });
    });

    it("when error in the tasks shoud catch the error", function(done) {
      waterfall([
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
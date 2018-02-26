const assert = require('chai').assert
const waterfall = require('../../callbacks/task_9')

describe('Task 9', function () {
  describe('#waterfall()', function () {
    it("when array of tasks is not empty should return 'done'",
      function (done) {
        waterfall([
          function (callback) {
            callback(null, 'one', 'two')
          },
          function (arg1, arg2, callback) {
            callback(null, 'three')
          },
          function (arg1, callback) {
            callback(null, 'done')
          }
        ], function (err, res) {
          assert.equal(res, 'done')
          done()
        })
      })

    it('when no tasks should return undefined', function (done) {
      waterfall([], function (err, res) {
        assert.isUndefined(res)
        done()
      })
    })

    it('when error in the tasks should catch the error', function (done) {
      waterfall([
        function (callback) {
          callback(null, 'one', 'two')
        },
        function (arg1, arg2, callback) {
          callback('Error', 'three')
        },
        function (arg1, callback) {
          callback(null, 'done')
        }
      ], function (err, res) {
        assert.equal(err, 'Error')
        done()
      })
    })
  })
})

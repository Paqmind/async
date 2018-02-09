const assert = require('chai').assert
const series = require('../../callbacks/task_8')

describe('Task 8', function () {
  describe('series()', function () {
    it("when array of tasks is not empty should return ['one', 'two']",
      function (done) {
        series([
          function (callback) {
            setTimeout(function () {
              callback(null, 'one')
            }, 200)
          },
          function (callback) {
            setTimeout(function () {
              callback(null, 'two')
            }, 100)
          }
        ], function (err, res) {
          assert.deepEqual(res, ['one', 'two'])
          done()
        })
      })

    it('when no tasks should return []', function (done) {
      series([], function (err, res) {
        assert.deepEqual(res, [])
        done()
      })
    })

    it('when error in the tasks should catch the error', function (done) {
      series([
        function (callback) {
          setTimeout(function () {
            callback('Error', 'one')
          }, 200)
        },
        function (callback) {
          setTimeout(function () {
            callback(null, 'two')
          }, 100)
        }
      ], function (err, res) {
        assert.equal(err, 'Error')
        done()
      })
    })
  })
})

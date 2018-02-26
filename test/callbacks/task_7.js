const assert = require('chai').assert
const parallel = require('../../callbacks/task_7')

describe('Task 7', function () {
  describe('#parallel()', function () {
    it("when array of tasks is not empty should return ['one', 'two']",
      function (done) {
        parallel([
          function (callback) {
            setTimeout(function () {
              callback(null, 'one')
            }, 20)
          },
          function (callback) {
            setTimeout(function () {
              callback(null, 'two')
            }, 10)
          }
        ], function (err, res) {
          console.log(res)
          assert.deepEqual(res, ['one', 'two'])
          done()
        })
      })

    it('when no tasks should return []', function (done) {
      parallel([], function (err, res) {
        assert.deepEqual(res, [])
        done()
      })
    })

    it('when error in the tasks should catch the error', function (done) {
      parallel([
        function (callback) {
          setTimeout(function () {
            callback('Error', 'one')
          }, 20)
        },
        function (callback) {
          setTimeout(function () {
            callback(null, 'two')
          }, 10)
        }
      ], function (err, res) {
        assert.equal(err, 'Error')
        done()
      })
    })
  })
})

const assert = require('chai').assert
const waterfall = require('../../callbacks/task_9')

describe('Task 9', () => {
  describe('#waterfall()', () => {
    it("when array of tasks is not empty should return 'done'",
      (done) => {
        waterfall([
          (callback) => {
            callback(null, 'one', 'two')
          },
          (arg1, arg2, callback) => {
            callback(null, 'three')
          },
          (arg1, callback) => {
            callback(null, 'done')
          }
        ], (err, res) => {
          assert.equal(res, 'done')
          done()
        })
      })

    it('when no tasks should return undefined', (done) => {
      waterfall([], (err, res) => {
        assert.isUndefined(res)
        done()
      })
    })

    it('when error in the tasks should catch the error', (done) => {
      waterfall([
        (callback) => {
          callback(null, 'one', 'two')
        },
        (arg1, arg2, callback) => {
          callback('Error', 'three')
        },
        (arg1, callback) => {
          callback(null, 'done')
        }
      ], (err, res) => {
        assert.equal(err, 'Error')
        done()
      })
    })
  })
})

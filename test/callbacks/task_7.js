const assert = require('chai').assert
const parallel = require('../../callbacks/task_7')

describe('Task 7', () => {
  describe('#parallel()', () => {
    it("when array of tasks is not empty should return ['one', 'two']",
      (done) => {
        parallel([
          (callback) => {
            setTimeout(() => {
              callback(null, 'one')
            }, 20)
          },
          (callback) => {
            setTimeout(() => {
              callback(null, 'two')
            }, 10)
          }
        ], (err, res) => {
          assert.deepEqual(res, ['one', 'two'])
          done()
        })
      })

    it('when no tasks should return []', (done) => {
      parallel([], (err, res) => {
        assert.deepEqual(res, [])
        done()
      })
    })

    it('when error in the tasks should catch the error', (done) => {
      parallel([
        (callback) => {
          setTimeout(() => {
            callback('Error', 'one')
          }, 20)
        },
        (callback) => {
          setTimeout(() => {
            callback(null, 'two')
          }, 10)
        }
      ], (err, res) => {
        assert.equal(err, 'Error')
        done()
      })
    })
  })
})

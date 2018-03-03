const assert = require('chai').assert
const series = require('../../callbacks/task_8')

describe('Task 8', () => {
  describe('#series()', () => {
    it("when array of tasks is not empty should return ['one', 'two']", (done) => {
        series([(callback) => {
            setTimeout(() => {
              callback(null, 'one')
            }, 20)
          }, (callback) => {
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
      series([], (err, res) => {
        assert.deepEqual(res, [])
        done()
      })
    })

    it('when error in the tasks should catch the error', (done) => {
      series([(callback) => {
          setTimeout(() => {
            callback('Error', 'one')
          }, 20)
        }, (callback) => {
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

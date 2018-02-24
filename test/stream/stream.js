const assert = require('chai').assert
const Stream = require('../../stream/stream')

describe('event_emitter/event_emitter.js', function () {
  describe('observe()', function() {
    it('should return unsubscribe function', function(done) {
      let streamFn = ({emit}) => {
        let x = 0
        let interval = setInterval(() => emit(x++), 100)
        return () => clearInterval(interval)
      }

      let observeArgs = []
      let observeFn = (arg) => observeArgs.push(arg)

      let s$ = new Stream(streamFn)
      let unsubscribeFn = s$.observe(observeFn)

      assert.isFunction(unsubscribeFn, 'return function')

      setTimeout(() => {
        unsubscribeFn()
        assert.deepEqual(observeArgs, [0, 1, 2, 3],
                         'observeFn called with right args')
        assert(s$.emitter.events['data'].length == 0,
               'unsubscribing correct')
        done()
      }, 500)
    })
  })
})

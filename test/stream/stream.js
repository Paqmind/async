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

    it('should call observeFn', function(done) {
      let streamFn = ({emit}) => {
        let x = 0
        let interval = setInterval(() => emit(x++), 100)
        return () => clearInterval(interval)
      }

      let observeArgs = []
      let observeFn = (arg) => observeArgs.push(arg)

      let s$ = new Stream(streamFn)
      let unsubscribeFn = s$.observe(observeFn)

      setTimeout(() => {
        unsubscribeFn()
        assert.deepEqual(observeArgs, [0, 1, 2, 3])
        done()
      }, 500)
    })

    it('should call streamFn once', function(done) {
      let streamFnCalls = 0
      let streamFn = ({emit}) => {
        streamFnCalls++
        let x = 0
        let interval = setInterval(() => emit(x++), 100)
        return () => clearInterval(interval)
      }

      let observeFn = (arg) => 'result'

      let s$ = new Stream(streamFn)
      let unsubscribeFn = s$.observe(observeFn)

      setTimeout(() => {
        unsubscribeFn()
        assert(streamFnCalls == 1)
        done()
      }, 500)
    })
  })

  describe('filter()', function() {
    it('should call observeFn with filtered args', function(done) {
      let streamFn = ({emit}) => {
        let x = 0
        let interval = setInterval(() => emit(x++), 100)
        return () => clearInterval(interval)
      }

      let observeArgs = []
      let observeFn = (arg) => observeArgs.push(arg)

      let stream$ = new Stream(streamFn)
      let filteredStream$ = stream$.filter((x) => x % 2 == 0)
      let unsubscribeFn = filteredStream$.observe(observeFn)

      setTimeout(() => {
        unsubscribeFn()
        assert.deepEqual(observeArgs, [0, 2])
        done()
      }, 500)
    })
  })

  describe('scan()', function() {
    it('should call observeFn with accumulator', function(done) {
      let streamFn = ({emit}) => {
        let x = 0
        let interval = setInterval(() => emit(x++), 100)
        return () => clearInterval(interval)
      }

      let observeArgs = []
      let observeFn = (arg) => observeArgs.push(arg)

      let stream$ = new Stream(streamFn)
      let scanedStream$ = stream$.scan(0, (x, y) => x + y)
      let unsubscribeFn = scanedStream$.observe(observeFn)

      setTimeout(() => {
        unsubscribeFn()
        assert.deepEqual(observeArgs, [0, 1, 3, 6])
        done()
      }, 500)
    })
  })
})

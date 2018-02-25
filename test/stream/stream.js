const assert = require('chai').assert
const Stream = require('../../stream/stream')

describe('event_emitter/event_emitter.js', function () {
  describe('observe()', function() {
    it('should return unsubscribe function', function(done) {
      let s$ = new Stream(({emit}) => {
        let x = 0
        let interval = setInterval(() => emit(x++), 10)
        return () => clearInterval(interval)
      })
      let unsubscribeFn = s$.observe((arg) => 'result')
      assert.isFunction(unsubscribeFn)
      unsubscribeFn()
      done()
    })

    it('unsubscribe function should stop observing', function(done) {
      let s$ = new Stream(({emit}) => {
        let x = 0
        let interval = setInterval(() => emit(x++), 10)
        return () => clearInterval(interval)
      })
      let unsubscribeFn = s$.observe((arg) => 'result')

      setTimeout(() => {
        unsubscribeFn()
        assert(s$.emitter.events['data'].length == 0)
        done()
      }, 50)
    })

    it('should call observeFn', function(done) {
      let s$ = new Stream(({emit}) => {
        let x = 0
        let interval = setInterval(() => emit(x++), 10)
        return () => clearInterval(interval)
      })
      let observeArgs = []
      let unsubscribeFn = s$.observe((arg) => {
        observeArgs.push(arg)
      })

      setTimeout(() => {
        unsubscribeFn()
        assert.deepEqual(observeArgs, [0, 1, 2, 3])
        done()
      }, 50)
    })

    it('should call streamFn once', function(done) {
      let streamFnCalls = 0
      let s$ = new Stream(({emit}) => {
        streamFnCalls++
        let x = 0
        let interval = setInterval(() => emit(x++), 10)
        return () => clearInterval(interval)
      })
      let unsubscribeFn = s$.observe((arg) => 'result')

      setTimeout(() => {
        unsubscribeFn()
        assert(streamFnCalls == 1)
        done()
      }, 50)
    })
  })

  describe('filter()', function() {
    it('should call observeFn with filtered args', function(done) {
      let stream$ = new Stream( ({emit}) => {
        let x = 0
        let interval = setInterval(() => emit(x++), 10)
        return () => clearInterval(interval)
      })
      let filteredStream$ = stream$.filter((x) => x % 2 == 0)
      let observeArgs = []
      let unsubscribeFn = filteredStream$.observe((arg) => {
        observeArgs.push(arg)
      })

      setTimeout(() => {
        unsubscribeFn()
        assert.deepEqual(observeArgs, [0, 2])
        done()
      }, 50)
    })
  })

  describe('scan()', function() {
    it('should call observeFn with accumulator', function(done) {
      let stream$ = new Stream(({emit}) => {
        let x = 0
        let interval = setInterval(() => emit(x++), 10)
        return () => clearInterval(interval)
      })
      let scanedStream$ = stream$.scan(0, (x, y) => x + y)
      let observeArgs = []
      let unsubscribeFn = scanedStream$.observe((arg) => {
        observeArgs.push(arg)
      })

      setTimeout(() => {
        unsubscribeFn()
        assert.deepEqual(observeArgs, [0, 1, 3, 6])
        done()
      }, 50)
    })
  })
})

const assert = require('chai').assert
const Stream = require('../../stream/stream')

describe('stream/stream.js', () => {
  describe('Stream', () => {
    describe('#observe()', () => {
      it('should call observeFn', (done) => {
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
        }, 45)
      })

      it('should call streamFn once', (done) => {
        let streamFnCalls = 0
        let s$ = new Stream(({emit}) => {
          streamFnCalls++
          let x = 0
          let interval = setInterval(() => emit(x++), 10)
          return () => clearInterval(interval)
        })
        let unsubscribeFn = s$.observe(_ => null)

        setTimeout(() => {
          unsubscribeFn()
          assert(streamFnCalls == 1)
          done()
        }, 45)
      })

      it('should return unsubscribe function', (done) => {
        let s$ = new Stream(({emit}) => {
          let x = 0
          let interval = setInterval(() => emit(x++), 10)
          return () => clearInterval(interval)
        })
        let unsubscribeFn = s$.observe(_ => null)
        assert.isFunction(unsubscribeFn)
        unsubscribeFn()
        done()
      })

      it('unsubscribe function should stop observing', (done) => {
        let xs = []
        let s$ = new Stream(({emit}) => {
          let interval = setInterval(() => xs.push(true), 10)
          return () => clearInterval(interval)
        })
        let unsubscribeFn = s$.observe(_ => null)

        setTimeout(() => {
          unsubscribeFn()
          assert(xs.length == 2)
          done()
        }, 25)
      })
    })

    describe('#map()', () => {
      it('should call observeFn with mapped args', (done) => {
        let stream$ = new Stream( ({emit}) => {
          let x = 0
          let interval = setInterval(() => emit(x++), 10)
          return () => clearInterval(interval)
        })
        let mappedStream$ = stream$.map((x) => x * 2)
        let observeArgs = []
        let unsubscribeFn = mappedStream$.observe((arg) => {
          observeArgs.push(arg)
        })

        setTimeout(() => {
          unsubscribeFn()
          assert.deepEqual(observeArgs, [0, 2, 4, 6])
          done()
        }, 45)
      })
    })

    describe('#filter()', () => {
      it('should call observeFn with filtered args', (done) => {
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
        }, 45)
      })
    })

    describe('#scan()', () => {
      it('should call observeFn with accumulator', (done) => {
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
        }, 45)
      })
    })

    describe('two subscriptions for one stream', () => {
      it('should work independently', (done) => {
        let s$1 = new Stream(({emit}) => {
          let x = 0
          let interval = setInterval(() => emit(x++), 10)
          return () => clearInterval(interval)
        })

        let observeArgs1 = []
        let observeArgs2 = []

        let uns1 = s$1.observe((arg) => observeArgs1.push(arg))
        let uns2
        setTimeout(() => {
          uns2 = s$1.observe((arg) => observeArgs2.push(arg))
        }, 30)

        setTimeout(() => {
          uns1()
          uns2()
          assert.deepEqual(observeArgs1, [0, 1, 2, 3, 4])
          assert.deepEqual(observeArgs2, [0, 1])
          done()
        }, 55)
      })
    })
  })
})

const EventEmitter = require('../event_emitter/event_emitter')

module.exports = class Stream {
  constructor (streamFn) {
    this.streamFn = streamFn
    this.emitter = new EventEmitter()
    this.unsubscribeFn = null
  }

  observe (observeFn) {
    this.emitter.on('data', observeFn)
    let noop = () => null
    this.unsubscribeFn = this.unsubscribeFn || this.streamFn({
      emit: (arg) => this.emitter.emit('data', arg)
    }) || noop
    return () => {
      this.unsubscribeFn()
      this.emitter.off('data', observeFn)
    }
  }

  map (mapFn) {
    return new Stream(({emit}) => {
      return this.observe(x => {
        emit(mapFn(x))
      })
    })
  }

  filter (filterFn) {
    return new Stream(({emit}) => {
      return this.observe(x => {
        if (filterFn(x)) {
          emit(x)
        }
      })
    })
  }

  scan (acc, scanFn) {
    return new Stream(({emit}) => {
      return this.observe((x) => {
        acc = scanFn(x, acc)
        emit(acc)
      })
    })
  }

  take (number) {
    return new Stream(({emit}) => {
      let unsubscribeFn = this.observe((x) => {
        if (number) {
          number--
          emit(x)
        } else {
          unsubscribeFn()
        }
      })
      return unsubscribeFn
    })
  }

  skip (number) {
    return new Stream(({emit}) => {
      return this.observe((x) => {
        number ? number-- : emit(x)
      })
    })
  }
}

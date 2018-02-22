const EventEmitter = require('../event_emitter/event_emitter')

module.exports = class Stream {
  constructor (streamFn) {
    this.streamFn = streamFn
    this.emitter = new EventEmitter()
  }

  observe (observeFn) {
    this.emitter.on("data", observeFn)
    let noop = () => null
    let unsubscribeFn = this.streamFn({
      emit: (...args) => this.emitter.emit("data", ...args)
    }) || noop
    return () => {
      unsubscribeFn()
      this.emitter.off("data", observeFn)
    }
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

  scan (number, acc) {
    return new Stream(({emit}) => {
      let unsubscribeFn = this.observe((x) => {
        if (number == 0) {
          unsubscribeFn()
        } else {
          number--
          emit(x, acc)
        }
      })
    })
  }
}

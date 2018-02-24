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
      emit: (arg) => this.emitter.emit("data", arg)
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

  scan (acc, scanFn) {
    return new Stream(({emit}) => {
      return this.observe((x) => {
        acc = scanFn(x, acc)
        emit(acc)
      })
    })
  }
}

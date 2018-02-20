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
      emit: (x) => this.emitter.emit("data", x)
    }) || noop
    return () => {
      unsubscribeFn()
      this.emitter.off("data", observeFn)
    }
  }
}

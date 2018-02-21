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

  filter (filterFn) {
    let filteredStream = new Stream(this.streamFn)
    filteredStream.observe = (observeFn) => {
      let observeFnWrapper = (arg) => {
        if (filterFn(arg)) {
          observeFn(arg)
        }
      }
      let noop = () => null

      filteredStream.emitter.on("data", observeFnWrapper)

      let unsubscribeFn = filteredStream.streamFn({
        emit: (x) => filteredStream.emitter.emit("data", x)
      }) || noop

      return () => {
        unsubscribeFn()
        filteredStream.emitter.off("data", observeFnWrapper)
      }
    }
    return filteredStream
  }
}

const EventEmitter = require('../event_emitter/event_emitter')

module.exports = class Stream {
  constructor (streamFn) {
    this.streamFn = streamFn
    this.emitter = new EventEmitter()
  }

  observe (observeFn) {
    let eventName = Math.random().toString(36).substr(2, 9)
    this.emitter.on(eventName, observeFn)
    let noop = () => null
    let unsubscribeFn = this.streamFn({
      emit: (arg) => this.emitter.emit(eventName, arg)
    }) || noop
    return () => {
      unsubscribeFn()
      this.emitter.off(eventName, observeFn)
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

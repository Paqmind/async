const EventEmitter = require('./event_emitter')

let filter = (filterFn, emitter) => {
  let emitter2 = new EventEmitter()
  emitter2.on = (event, listener) => {
    emitter.on(event, (arg) => {
      if filterFn(arg) {
        listener(arg)
      }
    })
  }
  return emitter2
}

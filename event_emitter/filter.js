const EventEmitter = require('./event_emitter')

let filter = (filterFn, emitter) => {
  let emitter2 = new EventEmitter()
  Object.keys(emitter.events).forEach((event) => {
    emitter2.events[event] = emitter.events[event].filter((cb) => {
      return filterFn(cb, arg)
    })
  })
  return emitter2
}

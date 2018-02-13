const EventEmitter = require('./event_emitter')

let map = (mapFn, emitter) => {
  let emitter2 = new EventEmitter()
  Object.keys(emitter.events).forEach((event) => {
    emitter2.events[event] = emitter.events[event].map((cb) => {
      return function(arg) {
        mapFn(cb, arg)
      }
    })
  })
  return emitter2
}

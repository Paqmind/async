const EventEmitter = require('./event_emitter')

let map = (mapFn, emitter) => {
  let emitter2 = new EventEmitter()
  emitter2.on = (event, listener) => {
    emitter.on(event, (arg) => {
      listener(mapFn(arg))
    })
  }
  return emitter2
}

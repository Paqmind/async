const EventEmitter = require('./event_emitter')
const getFunctionHashCode = require('./hash')

let map = (mapFn, emitter) => {
  let emitter2 = new EventEmitter()
  emitter2.on = (event, listener) => {
    let listenerWrapper = (arg) => {
      listener(mapFn(arg))
    }

    let listenerHashCode = {}
    listenerHashCode[getFunctionHashCode(listener)] = listenerWrapper

    emitter2.hashListeners = Object.assign(
      (emitter2.hashListeners || {}),
      listenerHashCode
    )

    emitter.on(event, listenerWrapper)
  }

  emitter2.off = (event, listener) => {
    emitter.off(event, emitter2.hashListeners[
      getFunctionHashCode(listener)
    ])
  }
  return emitter2
}

let ee = new EventEmitter()
let mapFn = (x) => x * 2

let ee2 = map(mapFn, ee)

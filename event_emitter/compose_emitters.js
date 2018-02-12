const EventEmitter = require('./event_emitter')

class ComposeEventEmitter {
  constructor (emitter) {
    this.emitter = emitter
    this.events = emitter.events
  }

  emit (event, arg) {
    if ((this.events[event] || []).length) {
      this.events[event].forEach((listener) => {
        listener(arg)
        listener(arg * 2)
      })
      return true
    } else {
      return false
    }
  }

  addListener (event, listener) {
    let listeners = this.events[event] || []
    if (!listeners.includes(listener)) {
      this.events[event] = listeners.concat([listener])
    }
    return this
  }

  removeListener (event, listener) {
    this.events[event] = (this.events[event] || [])
      .filter((cb) => {
        cb != listener
      })
    return this
  }

  once (event, listener) {
    let listenerWrapper = (arg) => {
      listener(arg)
      this.removeListener(event, listener)
    }
    this.events[event] = (this.events[event] || [])
      .concat([listenerWrapper])
    return listenerWrapper
  }
}

let ee = new EventEmitter()
let composeEmitter = new ComposeEventEmitter(ee)

composeEmitter.addListener('data', (arg) => {
  console.log(arg)
})

composeEmitter.emit('data', 1)
composeEmitter.emit('data', 2)
composeEmitter.emit('data', 3)

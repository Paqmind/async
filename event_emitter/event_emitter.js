class EventEmitter {
  constructor () {
    this.events = {}
  }

  emit (event, arg) {
    if ((this.events[event] || []).length) {
      this.events[event].forEach((listener) => listener(arg))
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
      .filter(cb => cb != listener)
    if (this.events[event].length == 0) {
      delete this.events[event]
    }
    return this
  }

  once (event, listener) {
    let listenerWrapper = (arg) => {
      listener(arg)
      this.removeListener(event, listenerWrapper)
    }
    this.events[event] = (this.events[event] || [])
      .concat([listenerWrapper])
    return listenerWrapper
  }
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener
EventEmitter.prototype.off = EventEmitter.prototype.removeListener

module.exports = EventEmitter

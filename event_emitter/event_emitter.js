class EventEmitter {
  constructor () {
    this.events = {}
  }

  emit (event, arg) {
    if (this.events[event] && this.events[event].length > 0) {
      this.events[event].forEach((listener) => {
        listener.callback(arg)
      })

      this.events[event] = this.events[event].filter((obj) => !obj.once)

      return true
    } else {
      return false
    }
  }

  addListener (event, listener) {
    let listenerObject = {
      once: false,
      callback: listener
    }
    if (this.events[event]) {
      this.events[event].push(listenerObject)
    } else {
      this.events[event] = [listenerObject]
    }
    return this
  }

  removeListener (event, listener) {
    if (this.events[event]) {
      let listeners = this.events[event].map((obj) => {
        return obj.callback
      })

      if (listeners.includes(listener)) {
        this.events[event]
            .splice(listeners.indexOf(listener), 1)
      }
    }
    return this
  }

  once (event, listener) {
    let listenerObject = {
      once: true,
      callback: listener
    }
    if (this.events[event]) {
      this.events[event].push(listenerObject)
    } else {
      this.events[event] = [listenerObject]
    }
    return this
  }
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener
EventEmitter.prototype.off = EventEmitter.prototype.removeListener

module.exports = EventEmitter

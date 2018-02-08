class EventEmitter {
  constructor () {
    this.events = {}
    this.oneTimeEvents = {}
  }

  emit (event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach( (listener) => {
        listenerArgs = args.shift() || []
        listener(...listenerArgs)
      })

      if (this.oneTimeEvents[event]) {
        this.oneTimeEvents[event].forEach( (listener) => {
          this.events[event]
              .splice(this.events[event].indexOf(listener), 1)
        })
        delete this.oneTimeEvents[event]
      }

      return true
    } else {
      return false
    }
  }

  addListener (event, listener) {
    if (this.events[event]) {
      this.events[event].push(listener)
    } else {
      this.events[event] = [listener]
    }
    return this
  }

  on (event, listener) {
    return addListener(event, listener)
  }

  removeListener (event, listener) {
    if (this.events[event].includes(listener)) {
      this.events[event]
          .splice(this.events[event].indexOf(listener), 1)
    }
    return this
  }

  off (event, listener) {
    return removeListener(event, listener)
  }

  once (event, listener) {
    if (this.events[event]) {
      this.oneTimeEvents[event].push(listener)
    } else {
      this.oneTimeEvents[event] = [listener]
    }
    return addListener (event, listener)
  }
}

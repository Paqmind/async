module.exports = class EventEmmiter {
  constructor() {}

  emit(event) {}

  addListener(event, listener) {}

  on(event, listener) {
    return addListener(event, listener);
  }

  removeListener(event, listener) {}

  off(event, listener) {
    return removeListener(event, listener);
  }

  once(event, listener) {}
}
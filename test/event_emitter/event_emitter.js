const assert = require('chai').assert
const EventEmitter = require('../../event_emitter/event_emitter')

describe('event_emitter/event_emitter.js', function () {
  let ee = new EventEmitter()
  let cb = () => 'test'

  describe('addListener()', function () {
    it('should add listner to events object', function() {
      let ee = new EventEmitter()
      let cb = () => 'test'
      ee.addListener('test', cb)
      assert.deepInclude(
        ee.events['test'],
        { callback: cb, once: false }
      )
    })

    it('should return emitter', function() {
      let ee = new EventEmitter()
      let cb = () => 'test'
      assert(ee.addListener('test', cb) == ee)
    })
  })

  describe('removeListener()', function () {
    it('should remove only one listener', function() {
      let ee = new EventEmitter()
      let cb = () => 'test'
      ee.addListener('test', cb)
      ee.addListener('test', cb)
      ee.removeListener('test', cb)
      assert(ee.events['test'].length == 1)
    })

    it('should return emitter', function() {
      let ee = new EventEmitter()
      let cb = () => 'test'
      ee.addListener('test', cb)
      assert(ee.removeListener('test', cb) == ee)
    })
  })

  describe('once()', function () {
    it('should return emitter', function() {
      let ee = new EventEmitter()
      let cb = () => 'test'
      assert(ee.once('test', cb) == ee)
    })

    it('listener should be removed after emit', function() {
      let ee = new EventEmitter()
      let cb = () => 'test'
      ee.once('test', cb)
      ee.emit('test')
      assert(ee.events['test'].length == 0)
    })
  })

  describe('emit()', function () {
    it('should return true if event exists and has listeners', function() {
      let ee = new EventEmitter()
      let cb = () => 'test'
      ee.addListener('test', cb)
      assert.isTrue(ee.emit('test'))
    })

    it('should return false if event does not exist', function() {
      let ee = new EventEmitter()
      assert.isNotTrue(ee.emit('none'))
    })

    it('should return false if event does not have listeners', function() {
      let ee = new EventEmitter()
      let cb = () => 'test'
      ee.addListener('test', cb)
      ee.removeListener('test', cb)
      assert.isNotTrue(ee.emit('test'))
    })

    it('should pass argument to each callback', function(done) {
      ee.addListener('test', (arg) => {
        assert.equal(arg, 'arg')
      }).addListener('test', (arg) => {
        assert.equal(arg, 'arg')
      }).addListener('test', () => {
        done()
      })

      ee.emit('test', 'arg')
    })
  })
})
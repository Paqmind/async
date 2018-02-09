const assert = require('chai').assert
const EventEmitter = require('../../event_emitter/event_emitter')

describe('event_emitter/event_emitter.js', function () {
  let ee = new EventEmitter()
  let cb = () => 'test'

  describe('addListener()', function () {
    it('should add listner to events object', function() {
      ee.addListener('test', cb)
      assert.isTrue(ee.events['test'].includes(cb))
    })

    it('should return emitter', function() {
      assert.equal(ee.addListener('test', cb), ee)
    })
  })

  describe('removeListener()', function () {
    it('should remove only one listener', function() {
      ee.removeListener('test', cb)
      assert.equal(ee.events['test'].length, 1)
    })

    it('should return emitter', function() {
      assert.equal(ee.removeListener('test', cb), ee)
    })
  })

  describe('once()', function () {
    it('should return emitter', function() {
      assert.equal(ee.once('test', cb), ee)
    })

    it('listener should be removed after emit', function() {
      ee.emit('test')
      assert.equal(ee.events['test'].length, 0)
    })
  })

  describe('emit()', function () {
    it('should return true if event exists and has listeners', function() {
      ee.addListener('test', cb)
      assert.isTrue(ee.emit('test'))
    })

    it('should return false if event does not exist', function() {
      assert.isNotTrue(ee.emit('none'))
    })

    it('should return false if event does not have listeners', function() {
      ee.removeListener('test', cb)
      assert.isNotTrue(ee.emit('test'))
    })

    it('should pass supplied arguments to each callback', function(done) {
      ee.addListener('test', (a, b, c) => {
        assert.equal(a, 'a')
        assert.equal(b, 'b')
        assert.equal(c, 'c')
      }).addListener('test', (d, e) => {
        assert.equal(d, 'd')
        assert.equal(e, 'e')
      }).addListener('test', () => {
        done()
      })

      ee.emit('test', ['a', 'b', 'c'], ['d', 'e'])
    })
  })
})
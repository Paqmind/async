const assert = require('chai').assert
const EventEmitter = require('../../event_emitter/event_emitter')

describe('event_emitter/event_emitter.js', () => {
  describe('EventEmitter', () => {
    describe('#addListener()', () => {
      it('should add listner to events object', () => {
        let ee = new EventEmitter()
        let cb = () => 'test'
        ee.addListener('test', cb)
        assert.include(ee.events['test'], cb)
      })

      it('should not add duplicate listner', () => {
        let ee = new EventEmitter()
        let cb = () => 'test'
        ee.addListener('test', cb)
        ee.addListener('test', cb)
        assert(ee.events['test'].length == 1)
      })

      it('should return emitter', () => {
        let ee = new EventEmitter()
        let cb = () => 'test'
        assert(ee.addListener('test', cb) == ee)
      })
    })

    describe('#removeListener()', () => {
      it('should remove listener', () => {
        let ee = new EventEmitter()
        let cb = () => 'test'
        ee.addListener('test', cb)
        ee.removeListener('test', cb)
        assert.isUndefined(ee.events['test'])
      })

      it('should return emitter', () => {
        let ee = new EventEmitter()
        let cb = () => 'test'
        ee.addListener('test', cb)
        assert(ee.removeListener('test', cb) == ee)
      })
    })

    describe('#once()', () => {
      it('should return listener wrapper', () => {
        let ee = new EventEmitter()
        let cb = () => 'test'
        let listenerWrapper = ee.once('test', cb)
        assert.isFunction(listenerWrapper)
      })

      it('listener should be removed after emit', () => {
        let ee = new EventEmitter()
        let cb = () => 'test'
        ee.once('test', cb)
        ee.emit('test')
        assert.isUndefined(ee.events['test'])
      })
    })

    describe('#emit()', () => {
      it('should return true if event exists and has listeners', () => {
        let ee = new EventEmitter()
        let cb = () => 'test'
        ee.addListener('test', cb)
        assert.isTrue(ee.emit('test'))
      })

      it('should return false if event does not exist', () => {
        let ee = new EventEmitter()
        assert.isNotTrue(ee.emit('none'))
      })

      it('should return false if event does not have listeners', () => {
        let ee = new EventEmitter()
        let cb = () => 'test'
        ee.addListener('test', cb)
        ee.removeListener('test', cb)
        assert.isNotTrue(ee.emit('test'))
      })

      it('should pass argument to each callback', (done) => {
        let ee = new EventEmitter()

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
})

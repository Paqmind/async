const Stream = require('./stream/stream')

let s$ = new Stream(({emit}) => {
  let x = 0
  let interval = setInterval(() => emit(x++), 500)
  return () => clearInterval(interval)
})
let uns = s$.observe((arg) => console.log('first: ' + arg))
setTimeout(() => {
  s$.observe((arg) => console.log('second: ' + arg))
}, 5000)

setTimeout(() => {
  uns()
}, 10000)
const Stream = require('./stream/stream')

let s$ = new Stream(({emit}) => {
  let x = 0
  let interval = setInterval(() => emit(x++), 500)
  return () => clearInterval(interval)
})
let uns = s$.take(10).observe((arg) => console.log('---' +arg))

setTimeout(() => {
  uns()
}, 1500)
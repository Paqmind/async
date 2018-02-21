const Stream = require('./stream/stream')

let streamFn = ({emit}) => {
  let x = 0
  let interval = setInterval(() => emit(x++), 100)
  return () => clearInterval(interval)
}

let observeFn = (arg) =>  {
  console.log(arg)
}

let s$ = new Stream(streamFn)
let s2$ = s$.filter((x) => x % 3 == 0)
let unsubscribeFn = s2$.observe(observeFn)

setTimeout(() => {
  unsubscribeFn()
}, 5000)
const Stream = require('./stream/stream')

let streamFn = ({emit}) => {
  let x = 0
  let interval = setInterval(() => emit(x++), 100)
}

let observeFn = (arg, acc) =>  {
  console.log(acc)
}

let s$ = new Stream(streamFn)
let uns = s$.observe((x) => console.log('__________'))
let s2$ = s$.scan(10, 0)
s2$.observe(observeFn)

// setTimeout(uns, 50000)
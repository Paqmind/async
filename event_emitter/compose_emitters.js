const EventEmitter = require('./event_emitter')

let e1 = new EventEmitter()
let e2 = new EventEmitter()

e1.on("data", (x) => {
  console.log("e1:", x)
  e2.emit("data", x)
})

e2.on("data", (x) => {
  console.log("e2:", x * 2)
})

e1.emit("data", 1)
e1.emit("data", 2)
e1.emit("data", 3)

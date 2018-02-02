function afn1(next) {
  setTimeout(() => next("a1"), rand(0, 1000))
}

function afn2(next) {
  setTimeout(() => next("a2"), rand(0, 1000))
}

function afn3(next) {
  setTimeout(() => next("a3"), rand(0, 1000))
}

function done(rs) {
  console.log(...rs)
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

let afns = [afn1, afn2, afn3]
let rs = []

afns.forEach((afn, i, arr) => {
  afn((x) => {
    rs.push(x)
    if (rs.length === arr.length) {
      done(rs)
    }
  })
})
 // Expected to log "a1 a2 a3" in random order
function afn1 (x, next) {
  setTimeout(() => next('a1' + x), rand(0, 1000))
}

function afn2 (x, next) {
  setTimeout(() => next('a2' + x), rand(0, 1000))
}

function afn3 (x, next) {
  setTimeout(() => next('a3' + x), rand(0, 1000))
}

function done (rs) {
  console.log(...rs)
}

function rand (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

let afns = [afn1, afn2, afn3]

let rs = []
for (let i = 0; i < afns.length; i++) {
  afns[i](i + 1, (r) => {
    rs.push(r)
    if (rs.length === afns.length) {
      done(rs) // Expected to log "a11 a22 a33" in any order
    }
  })
}

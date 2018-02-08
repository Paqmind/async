function afn1 (next) {
  next('a1')
}

function afn2 (next) {
  next('a2')
}

function afn3 (next) {
  next('a3')
}

function done (x1, x2, x3) {
  console.log(x1, x2, x3)
}

afn1((x1) => {
  afn2((x2) => {
    afn3((x3) => {
      done(x1, x2, x3)
    })
  })
})

// Expected to log "a1 a2 a3"

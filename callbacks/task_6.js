// LIBRARY (do-not-change)
let rand = (min, max) => Math.floor(Math.random() * (max - min) + min)
let chance = (c) => rand(1, 100) <= c ? true : false // `c` percent of success

// Sync buggy IO
function doIOSync() {
  if (chance(75)) {
    return ["A", "B", "C", "D"][rand(0, 4)]
  } else {
    throw Error(["E1", "E2"][rand(0, 2)])
  }
}

// Async function doing buggy IO
function afn(next) {
  let res, err
  try {
    res = doIOSync()
  } catch (e) {
    err = e
  } finally {
    next(err, res)
  }
}

// APP CODE (change here)
afn((err, res) => {
  let displayLetter = (err, res) => {
    err ? afn(displayLetter) : console.log(res)
  }
  displayLetter(err, res)
})
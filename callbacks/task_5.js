// LIBRARY CODE (do not change)
let map = (fn, xs) => xs.map(fn)
let sum = (xs) => xs.reduce((z, x) => z + x, 0)
let double = (x) => x * 2

function aMap (fn, xs, next) {
  next(map(fn, xs))
}

function aSum (xs, next) {
  next(sum(xs))
}

// APP CODE (change here)
aMap(double, [1, 2, 3], (arr) => {
  aSum(arr, (sum) => console.log(sum))
})

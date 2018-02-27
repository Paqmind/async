module.exports = function waterfall (fns, lastFn) {
  let results = []

  if (!lastFn) {
    lastFn = function () {}
  }

  function go (params) {
    let fn = fns.shift()
    if (fn) {
      fn(...params, function next (err) {
        if (err) {
          lastFn(err)
        } else {
          results = [...arguments].slice(1)
          go(results)
        }
      })
    } else {
      lastFn(null, ...results)
    }
  }
  go([])
}

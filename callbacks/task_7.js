module.exports = function parallel(tasks, callback) {
  let results

  if (tasks instanceof Array) {
    results = []
  } else if (tasks instanceof Object) {
    results = {}
  } else {
    tasks = {}
    results = {}
  }

  if (!callback) {
    callback = function(err, res) {}
  }

  let keys = Object.keys(tasks)

  keys.forEach((key) => {
    tasks[key]((err, res) => {
      if (err) {
        callback(err)
      } else {
        results[key] = res
        if (Object.keys(results).length === keys.length) {
          callback(err, results)
        }
      }
    })
  })
}


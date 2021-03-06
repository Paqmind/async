module.exports = function parallel (tasks, callback) {
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
    callback = function () {}
  }

  let keys = Object.keys(tasks)

  if (keys.length === 0) {
    callback(null, results)
  } else {
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
}

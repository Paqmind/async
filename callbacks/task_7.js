function parallel(tasks, callback) {
  let results

  if (tasks instanceof Array) {
    results = []
  } else if (tasks instanceof Object) {
    results = {}
  } else {
    tasks = {}
    results = {}
  }

  let keys = Object.keys(tasks)

  keys.forEach((key) => {
    tasks[key]((err, res) => {
      if (err && calback) {
        callback(err)
      } else {
        results[key] = res
        if (callback && Object.keys(results).length === keys.length) {
          callback(err, results)
        }
      }
    })
  })
}


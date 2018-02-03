function series(tasks, callback) {
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
  let index = 0

  tasks[keys[index]]((err, res) => {
    let count = (err, res) => {
      if (err && callback) {
        callback(err)
      } else {
        results[keys[index]] = res

        if (calback && index === keys.length - 1) {
          callback(err, results)
        } else {
          tasks[keys[++index]](count)
        }
      }
    }
    count(err, res)
  })
}


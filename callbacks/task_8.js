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
      if (err) {
        callback(err)
      } else if (index === keys.length - 1) {
        results[keys[index]] = res
        callback(err, results)
      } else {
        results[keys[index]] = res
        tasks[keys[++index]](count)
      }
    }
    count(err, res)
  })
}


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

  if (!callback) {
    callback = function(err, res) {}
  }

  let keys = Object.keys(tasks)
  let index = 0

  tasks[keys[index]]((err, res) => {
    let count = (err, res) => {
      if (err) {
        callback(err)
      } else {
        results[keys[index]] = res
        if (index === keys.length - 1) {
          callback(err, results)
        } else {
          tasks[keys[++index]](count)
        }
      }
    }
    count(err, res)
  })
}



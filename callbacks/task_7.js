function parallel(tasks, callback) {
  let results = []
  let keys = Object.keys(tasks)
  keys.forEach((key) => {
    tasks[key]((err, res) => {
      if (err) {
        callback(err)
      }
      results.push(res)
      if (callback && results.length === keys.length) {
        callback(null, results)
      }
    })
  })
}

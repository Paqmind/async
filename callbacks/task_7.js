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
      if (err) {
        callback(err)
      }

      results[key] = res

      if (callback && Object.keys(results).length === keys.length) {
        callback(err, results)
      }
    })
  })
}

parallel([
    function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 1000);
    },
    function(callback) {
        setTimeout(function() {
            callback(null, 2);
        }, 700);
    }
], function(err, results) {
  console.log(results)
});
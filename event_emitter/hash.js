module.exports = function getFunctionHashCode (func) {
  let hash = 0
  let str = func.toString()
  if (str.length == 0) return hash
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString()
}
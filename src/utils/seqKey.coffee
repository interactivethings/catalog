module.exports = (namespace) ->
  counter = 0
  ->
    "#{namespace}-#{counter++}"

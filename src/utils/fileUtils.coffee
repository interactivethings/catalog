dirname = (path) ->
  [_dirname..., _] = path.split('/')
  _dirname.shift('') if _dirname[0] is ''
  _dirname.join('/')

filename = (path) ->
  [_..., _filename] = path.split('/')
  _filename

# root = a/b
# path -> a/b/path
# ./path -> a/b/path
# ../path -> a/path
# ../../path -> path
# ../../../path -> ../a/b/path
# b/path -> a/b/path
# /path -> /path

normalizePath = (root, path) ->
  return path if path.match(/^\//)

  rootFragments = root.split('/').reverse()
  fragments = path.split('/').reverse()

  result = []
  for fragment in fragments
    switch fragment
      when '.'
        result = result.concat(rootFragments)
        rootFragments = []
      when '..'
        if rootFragments.length > 0
          rootFragments.shift()
        else
          result.push(fragment)
      else
        rootFragments.shift() if fragment is rootFragments[0]
        result.push(fragment)

  result.concat(rootFragments).reverse().join('/')


module.exports = {dirname, filename, normalizePath}

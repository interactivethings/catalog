escapeRegExp = require('../../../utils/escapeRegExp')
fileUtils = require('../../../utils/fileUtils')

module.exports = (rootPath, files, body) ->
  for file in files
    regexp = new RegExp("([\"\'])([\.\/a-z0-9]*#{escapeRegExp(fileUtils.filename(file.source))})([\"\'])", 'gi')
    body = body.replace regexp, (_, left, path, right) ->
      targetPath = if file.source is fileUtils.normalizePath(rootPath, path)
        file.target
      else
        path
      left + targetPath + right
    null
  body

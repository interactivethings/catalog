{Promise} = require('es6-promise')
JSZip = require('jszip');
saveAs = require('../../../../lib/FileSaver')

require('./Project.scss')

React = require('react')
reqwest = require('reqwest')
escapeRegExp = require('../../../utils/escapeRegExp')
TabbedSourceView = require('./TabbedSourceView')
{a, button, div, iframe, section, textarea} = React.DOM


#
# Project component
#

module.exports = React.createClass
  propTypes:
    name: React.PropTypes.string.isRequired
    index: React.PropTypes.object
    files: React.PropTypes.array.isRequired
    size: React.PropTypes.shape({
      height: React.PropTypes.string
      width:  React.PropTypes.string
    }).isRequired
    sourceView: React.PropTypes.array

  getDefaultProps: ->
    sourceView: []

  render: ->
    {width, height} = @props.size

    div
      className: 'cg-Specimen-Project'
      iframe
        className: 'cg-Specimen-Project-frame'
        src: @props.index.source
        marginheight: 0
        marginwidth: 0
        scrolling: 'no'
        style:
          height: "#{height}"
          width: "#{width}"
      a
        className: 'cg-Specimen-Project-linkExternal'
        href: @props.index.source
        target: '_blank'
        "Open in new window"
      a
        className: 'cg-Specimen-Project-linkExternal'
        href: "#"
        onClick: @download
        "Download"

      TabbedSourceView(files: sourceViewFiles(@props))

  download: (evt) ->
    evt.preventDefault()

    zip = new JSZip()
    root = zip.folder(@props.name)

    rootPath = dirname(@props.index.source)

    files = @props.files.map (file) =>
      new Promise (resolve, reject) =>
        reqwest(url: file.source, type: 'text')
          .then((res) =>
            content = if _.contains sourceViewFiles(@props), file
              normalizeReferencesSimple(rootPath, @props.files, res.responseText)
            else
              res.responseText

            resolve({
              path: file.target,
              content: content
            })
          )
          .fail(reject)

    Promise.all(files).then((files) =>
      files.forEach (f) -> root.file(f.path, f.content)
      blob = zip.generate(type: 'blob')
      saveAs(blob, "#{@props.name}.zip");
    )
    .catch (res) =>
      console.log 'Preparing ZIP file failed', res


#
# Utils
#

dirname = (path) ->
  [_dirname..., _] = path.split('/')
  _dirname.shift('') if _dirname[0] is ''
  _dirname.join('/')

# root = a/b
# path -> a/b/path
# ./path -> a/b/path
# ../path -> a/path
# ../../path -> path
# ../../../path -> ../a/b/path
# b/path -> a/b/path
# /path -> /path

filename = (path) ->
  [_..., _filename] = path.split('/')
  _filename

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


sourceViewFiles = (props) ->
  props.files.filter (d) -> _.contains props.sourceView, d.target

filterMatching = (list, prop) ->
  (d) -> _.contains(list, d[prop])

normalizeReferencesSimple = (rootPath, files, body) ->
  for file in files
    regexp = new RegExp("([\"\'])([\.\/a-z0-9]*#{escapeRegExp(filename(file.source))})([\"\'])", 'gi')
    body = body.replace regexp, (_, left, path, right) ->
      targetPath = if file.source is normalizePath(rootPath, path)
        file.target
      else
        path
      left + targetPath + right
    null
  body

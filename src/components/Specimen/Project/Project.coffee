{Promise} = require('es6-promise')
JSZip = require('jszip');
saveAs = require('../../../../lib/FileSaver')

require('./Project.scss')

React = require('react')
reqwest = require('reqwest')
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

      TabbedSourceView(files: @props.files.filter (d) => _.contains @props.sourceView, d.target)

  download: (evt) ->
    evt.preventDefault()

    zip = new JSZip()
    root = zip.folder(@props.name)

    files = @props.files.map (file) =>
      new Promise (resolve, reject) =>
        reqwest(url: file.source, type: 'text')
          .then((res) =>
            content = if file is @props.index
              normalizeReferences(@props.files, res.responseText)
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

normalizeReferences = (files, html) ->
  doc = new DOMParser().parseFromString(html, 'text/html')

  # Scripts
  scripts = doc.getElementsByTagName('script')
  for script in scripts
    src = script.getAttribute('src')
    continue if src is null
    for file in files
      if isSamePath(file.source, src)
        script.setAttribute('src', file.target)

  # Links
  links = doc.getElementsByTagName('link')
  for script in links
    src = script.getAttribute('href')
    continue if src is null
    for file in files
      if isSamePath(file.source, src)
        script.setAttribute('src', file.target)

  doc.documentElement.innerHTML

isSamePath = (a, b) ->
  rootPath(a) is rootPath(b)

rootPath = (path) ->
  if path.match(/^(?!http)[^\/](.*)/i) then "/#{path}" else path


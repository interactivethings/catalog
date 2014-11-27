{Promise} = require('es6-promise')
JSZip = require('jszip');
saveAs = require('../../../../lib/FileSaver')

require('./Project.scss')

React = require('react')
reqwest = require('reqwest')
fileUtils = require('../../../utils/fileUtils')
TabbedSourceView = require('./TabbedSourceView')
normalizeReferences = require('./normalizeReferences')
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

      TabbedSourceView
        rootPath: fileUtils.dirname(@props.index.source)
        files: @props.files
        sourceFiles: sourceViewFiles(@props)

  download: (evt) ->
    evt.preventDefault()

    zip = new JSZip()
    root = zip.folder(@props.name)

    rootPath = fileUtils.dirname(@props.index.source)

    # It worked! The monkeys banged away on the keyboard and something functioning
    # came out of it! Such mess, but such works. Wow.
    virtualFiles = []
    files = @props.files.map (file) =>
      new Promise (resolve, reject) =>
        reqwest(url: file.source, type: 'text')
          .then((res) =>
            content = if _.contains sourceViewFiles(@props), file
              normalizeReferences(rootPath, @props.files, res.responseText)
            else
              res.responseText

            if file is @props.index
              virtualFiles = virtualFiles.concat(parseExposedFiles(content))

              if file.template?
                reqwest(url: file.template, type: 'text').then (templateRes) =>
                  template = templateRes.responseText

                  doc = new DOMParser().parseFromString(content, 'text/html');
                  for node in doc.querySelectorAll('[data-catalog-project-expose]')
                    path = node.getAttribute('data-catalog-project-expose')
                    node.removeAttribute('data-catalog-project-expose')
                    node.setAttribute('src', path)
                    node.innerHTML = ''

                  virtualFiles.push
                    path: fileUtils.filename(file.template)
                    content: template.replace('${yield}', doc.body.innerHTML)

                  content = content.replace(/\s+data-catalog-project-expose=[\"\'].+?[\"\']/, '')
                  resolve(path: file.target, content: content)
              else
                content = content.replace(/\s+data-catalog-project-expose=[\"\'].+?[\"\']/, '')
                resolve(path: file.target, content: content)
            else
              resolve(path: file.target, content: content)
          )
          .fail(reject)

    Promise.all(files).then((files) =>
      files.forEach (f) -> root.file(f.path, f.content)
      virtualFiles.forEach (f) -> root.file(f.path, f.content)
      blob = zip.generate(type: 'blob')
      saveAs(blob, "#{@props.name}.zip");
    )
    .catch (res) =>
      console.log 'Preparing ZIP file failed', res


#
# Utils
#

sourceViewFiles = (props) ->
  props.files.filter (d) -> _.contains props.sourceView, d.target

filterMatching = (list, prop) ->
  (d) -> _.contains(list, d[prop])

parseExposedFiles = (source) ->
  doc = new DOMParser().parseFromString(source, 'text/html');
  files = []
  for node in doc.querySelectorAll('[data-catalog-project-expose]')
    path = node.getAttribute('data-catalog-project-expose')
    node.removeAttribute('data-catalog-project-expose')
    files.push
      path: path
      content: node.innerHTML
  files

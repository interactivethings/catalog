JSZip = require('jszip');
saveAs = require('../../../../lib/FileSaver')

require('./Project.scss')

React = require('react')
reqwest = require('reqwest')
fileUtils = require('../../../utils/fileUtils')
TabbedSourceView = React.createFactory require('./TabbedSourceView')
normalizeReferences = require('./normalizeReferences')
{a, button, div, iframe, section, textarea} = React.DOM


#
# Project component
#

module.exports = React.createClass
  propTypes:
    name: React.PropTypes.string.isRequired
    index: React.PropTypes.object
    scrolling: React.PropTypes.string.isRequired
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
        marginHeight: 0
        marginWidth: 0
        scrolling: @props.scrolling
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

        # When dealing with an image, we need to make sure to load it as binary
        # data, not plain text. We do this by issuing a custom request with a
        # response type of 'arraybuffer'.
        # https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data
        #
        # This does not work in older browsers, if a need arises to support them,
        # we can use the jBinary library instead.
        # https://github.com/jDataView/jBinary/wiki
        #
        # Also, note that our 'image' detection is extremely primitive and won't
        # support all images, let alone other binary data.
        if isImage(file.source)

          req = new XMLHttpRequest()
          req.open('GET', file.source, true)
          req.responseType = 'arraybuffer'
          req.onload = (evt) ->
            # jszip also accepts raw array buffers as input
            resolve(path: file.target, content: req.response)
          req.onerror = reject
          req.send(null)

        # In all other cases, we want to load the file as plain text and process
        # it further before adding it to the zip file.
        else

          reqwest(url: file.source, type: 'text', headers: {Accept: 'text/plain,*/*'})
            .then((res) =>
              content = if _.contains sourceViewFiles(@props), file
                normalizeReferences(rootPath, @props.files, res.responseText)
              else
                res.responseText

              if file is @props.index
                virtualFiles = virtualFiles.concat(parseExposedFiles(content))

                if file.template?
                  reqwest(url: file.template, type: 'text', headers: {Accept: 'text/plain,*/*'}).then (templateRes) =>
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
      files.forEach (f) -> root.file(f.path, f.content, binary: isImage(f.path))
      virtualFiles.forEach (f) -> root.file(f.path, f.content, binary: isImage(f.path))
      blob = zip.generate(type: 'blob')
      saveAs(blob, "#{@props.name}.zip");
    )
    .catch (res) =>
      console.log 'Preparing ZIP file failed', res


#
# Utils
#

isImage = (path) ->
  path.match(/\.(jpe?g|gif|png)$/)

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

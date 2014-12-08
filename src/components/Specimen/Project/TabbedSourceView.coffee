require('./TabbedSourceView.scss')

React = require('react')
reqwest = require('reqwest')
normalizeReferences = require('./normalizeReferences')
{button, div, textarea} = React.DOM


module.exports = React.createClass
  getInitialState: ->
    tab: null
    sourceCode: null

  getDefaultProps: ->
    files: []
    sourceFiles: []

  componentDidMount: ->
    @loadSourceCode()

  componentDidUpdate: ->
    @loadSourceCode() unless @state.sourceCode?

  render: ->
    div {className: 'cg-Specimen-TabbedSourceView'},
      if @props.sourceFiles.length > 1
        @props.sourceFiles.map (file, i) =>
          button
            className: "cg-Specimen-TabbedSourceView-tab #{'active' if i is @state.tab}"
            key: i
            'data-tab-id': i
            onClick: @selectTab
            file.target

      if @state.tab?
        textarea
          className: 'cg-Specimen-TabbedSourceView-source'
          value: if @state.sourceCode? then @state.sourceCode else 'Loading …'
          readOnly: true

  selectTab: (evt) ->
    nextTab = +evt.currentTarget.getAttribute('data-tab-id')
    @setState
      sourceCode: null
      tab: if nextTab is @state.tab then null else nextTab

  loadSourceCode: ->
    return unless @state.tab?

    file = @props.sourceFiles[@state.tab]

    requests = [reqwest({url: file.source, type: 'text', headers: {Accept: 'text/plain,*/*'}})]
    requests.push(reqwest({url: file.template, type: 'text', headers: {Accept: 'text/plain,*/*'}})) if file.template?

    Promise.all(requests)
      .then((res) =>
        content = res.map((d) -> d.responseText)
        sourceCode = parseSourceCode(content...)
        @setState sourceCode: normalizeReferences(@props.rootPath, @props.files, sourceCode)
      )
      .catch (res) =>
        @setState
          error: res.statusText
          children: null


#
# Utils
#

parseSourceCode = (source, template) ->
  if template?
    doc = new DOMParser().parseFromString(source, 'text/html');
    for node in doc.querySelectorAll('[data-catalog-project-expose]')
      node.removeAttribute('data-catalog-project-expose')
    template.replace('${yield}', doc.body.innerHTML)
  else
    source

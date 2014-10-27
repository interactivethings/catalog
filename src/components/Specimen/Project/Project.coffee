{Promise} = require('es6-promise')
require('./Project.scss')

React = require('react')
reqwest = require('reqwest')
{a, button, div, iframe, section, textarea} = React.DOM

module.exports = React.createClass
  getDefaultProps: ->
    index: null
    files: []
    size:
      height: 500,
      width: '100%'

  render: ->
    {width, height} = parseSize(@props.size)

    div
      className: 'cg-Specimen-Project'
      iframe
        className: 'cg-Specimen-Project-frame'
        src: parseUrl(@props.index)
        marginheight: 0
        marginwidth: 0
        scrolling: 'no'
        style:
          height: "#{height}"
          width: "#{width}"
      a
        className: 'cg-Specimen-Project-linkExternal'
        href: @props.index
        target: '_blank'
        "In neuem Fenster öffnen"

      TabbedSourceView(files: [@props.index].concat(@props.files))


TabbedSourceView = React.createClass
  getInitialState: ->
    tab: 0
    sourceCode: null

  getDefaultProps: ->
    files: []

  componentDidMount: ->
    @loadSourceCode()

  componentDidUpdate: ->
    @loadSourceCode() unless @state.sourceCode?

  render: ->
    div {},
      if @props.files.length > 1
        @props.files.map (file, i) =>
          file = parseUrl(file)
          [path..., name] = file.split('/')
          button
            key: i
            'data-tab-id': i
            onClick: @selectTab
            name

      textarea
        className: 'cg-Specimen-Project-source'
        value: if @state.sourceCode? then @state.sourceCode else 'Loading …'
        readOnly: true

  selectTab: (evt) ->
    @setState
      sourceCode: null
      tab: +evt.currentTarget.getAttribute('data-tab-id')

  loadSourceCode: ->
    file = @props.files[@state.tab]
    templateUrl = parseTemplateUrl(file)

    requests = [reqwest(url: parseUrl(file), type: 'text')]
    requests.push(reqwest(url: templateUrl, type: 'text')) if templateUrl?

    Promise.all(requests)
      .then((res) =>
        content = res.map((d) -> d.responseText)
        @setState sourceCode: parseSourceCode(content...)
      )
      .catch (res) =>
        @setState
          error: res.statusText
          children: null


parseSourceCode = (source, template) ->
  if template?
    doc = new DOMParser().parseFromString(source, 'text/html');
    template.replace('${yield}', doc.body.innerHTML)
  else
    source

parseUrl = (file) ->
  if file.path? then file.path else file

parseTemplateUrl = (file) ->
  if file.template? then file.template else null

parseSize = (size) ->
  {width, height} = size
  height = "#{height}px" if typeof height is 'number'
  width  = "#{width}px"  if typeof width  is 'number'
  {width, height}

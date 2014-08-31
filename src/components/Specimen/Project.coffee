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
      className: 'cg-SpecimenProject'
      iframe
        className: 'cg-SpecimenProject-frame'
        src: @props.index
        marginheight: 0
        marginwidth: 0
        scrolling: 'no'
        style:
          height: "#{height}"
          width: "#{width}"
      a
        className: 'cg-SpecimenProject-linkExternal'
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
          [path..., name] = file.split('/')
          button
            key: i
            'data-tab-id': i
            onClick: @selectTab
            name

      textarea
        className: 'cg-SpecimenProject-source'
        value: if @state.sourceCode? then @state.sourceCode else 'Loading …'
        readOnly: true

  selectTab: (evt) ->
    @setState
      sourceCode: null
      tab: +evt.currentTarget.getAttribute('data-tab-id')

  loadSourceCode: ->
    url = @props.files[@state.tab]
    reqwest(url: url, type: 'text')
      .then((res) => @setState sourceCode: res.responseText)
      .fail (res) =>
        @setState
          error: res.statusText
          children: null

parseSize = (size) ->
  {width, height} = size
  height = "#{height}px" if typeof height is 'number'
  width  = "#{width}px"  if typeof width  is 'number'
  {width, height}

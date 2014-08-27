reqwest = require('reqwest')
React = require('react')
Loader = require('./Loader')
MarkdownRenderer = require('./MarkdownRenderer')
{div} = React.DOM

module.exports = React.createClass
  propTypes:
    title:   React.PropTypes.string.isRequired
    name:    React.PropTypes.string.isRequired
    src:     React.PropTypes.string.isRequired
    styles:  React.PropTypes.arrayOf(React.PropTypes.string)
    scripts: React.PropTypes.arrayOf(React.PropTypes.string)
    iframe:  React.PropTypes.bool

  getDefaultProps: ->
    styles: []
    scripts: []
    iframe: false

  getInitialState: ->
    error: null
    children: null

  componentDidMount: ->
    @props.scripts.map(Catalog.actions.runscript)
    @fetchPageData()

  render: ->
    if @state.error?
      div {}, "Error: #{@state.error}"
    else if @state.children?
      div {className: 'cg-Page'}, @state.children
    else
      Loader()

  fetchPageData: ->
    reqwest(url: @props.src, type: 'text')
      .then((res) => @setState children: MarkdownRenderer(res.responseText, @props))
      .fail (res) =>
        @setState
          error: res.statusText
          children: null

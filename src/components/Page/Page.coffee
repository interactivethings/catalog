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
    @fetchPageData()
    @executeScripts() if @state.children?

  componentDidUpdate: ->
    @executeScripts() if @state.children?

  executeScripts: ->
    _.each @getDOMNode().querySelectorAll('script[data-runscript]'), executeScript

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


#
# Functions
#

# Executes a script that has been inserted through innerHTML
executeScript = (el) ->
  src = el.src
  head = document.getElementsByTagName("head")[0] or document.documentElement
  script = document.createElement("script")
  script.setAttribute "src", src
  script.setAttribute "type", "text/javascript"
  head.insertBefore script, head.firstChild
  head.removeChild script

reqwest = require('reqwest')
React = require('react')
Loader = require('./Loader')
MarkdownRenderer = require('../../MarkdownRenderer')

Card = require('../Card/Card')
Specimen = require('../Specimen/Specimen')

{div, link} = React.DOM

seqKey = require('../../utils/seqKey')('cg-Page')

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
    content: null

  componentDidMount: ->
    @props.scripts.map(Catalog.actions.runscript)
    @fetchPageData()

  render: ->
    if @state.error?
      div {}, "Error: #{@state.error}"
    else if @state.content?
      div {className: 'cg-Page'},
        @props.styles.map(createStyleElement)
        MarkdownRenderer
          text: @state.content
          section: (children) ->
            Card(key: seqKey(), children)
          renderer:
            code: (code, configStr) =>
              Specimen _.extend {code: code, iframe: @props.iframe, specimen: @props.specimen, styles: @props.styles}, consumeConfigStr(configStr)
            heading: (text, level) ->
              React.DOM["h#{level}"] {key: seqKey()}, text
    else
      Loader()

  fetchPageData: ->
    reqwest(url: @props.src, type: 'text')
      .then((res) => @setState content: res.responseText)
      .fail (res) =>
        @setState
          error: res.statusText
          content: null


createStyleElement = (src) ->
  link {key: seqKey(), rel: 'stylesheet', type: 'text/css', href: src}

consumeConfigStr = (str = '') ->
  [specimen, optionsStr] = str.split('|')
  options = _.compact (optionsStr or '').split(',')

  specimen: specimen
  runscript: _.include options, 'run-script'
  fullbleed: _.include options, 'fullbleed'

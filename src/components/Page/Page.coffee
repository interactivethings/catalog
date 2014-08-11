reqwest = require('reqwest')
marked = require('../../../lib/react-markdown')
React = require('react')
Frame = require('react-frame-component')
{Link} = require('react-nested-router')
{div, section, link, style} = React.DOM

module.exports = React.createClass

  getInitialState: ->
    error: null
    children: null

  componentDidMount: ->
    @fetchPageData(@props.src)

  render: ->
    if @state.error?
      div {}, "Error: #{@state.error}"
    else if @state.children?
      div {className: 'cg-Page'}, @state.children
    else
      div {className: 'cg-Page-loader'}

  fetchPageData: (src) ->
    reqwest(url: src, type: 'text')
      .then((res) => @setState children: MarkdownRenderer(res.responseText, this.props))
      .fail (res) =>
        @setState
          error: res.statusText
          children: null


#
# Markdown Renderer
#
MarkdownRenderer = (markdown, props) ->
  renderer = new marked.Renderer()
  renderer.heading = HeadingRenderer
  renderer.code = CodeRenderer(props)

  children = marked markdown,
    renderer: renderer
    gfm: true
    breaks: false
    sanitize: false
    smartLists: true
    smartypants: true

  createSections(children)

CodeRenderer = (props) ->
  (code, modifiers = '') ->
    if modifiers is 'code'
      section
        className: "cg-CodeBlock cg-CodeBlock--#{modifiers}"
        dangerouslySetInnerHTML: {__html: code}
    else
      section
        className: "cg-CodeBlock #{if modifiers then "cg-CodeBlock--#{modifiers}" else ''}"
        Frame
          className: 'cg-Frame'
          head: [
            style(null, 'html,body{margin:0;padding:0}')
            props.styles.map (s) -> link(rel: 'stylesheet', type: 'text/css', href: s)
          ]
          div
            dangerouslySetInnerHTML: {__html: code}

HeadingRenderer = (text, level) ->
  React.DOM["h#{level}"] null, text

createSections = (children) ->
  sections = []
  currentSection = {wrap: false, children: []} # First section isn't a card

  children.forEach (descriptor) ->
    if descriptor.type.displayName is 'h2' # Caveat: This isn't a documented React API
      # start new section
      sections.push currentSection
      currentSection = {wrap: true, children: []}
    currentSection.children.push(descriptor)
    null

  sections.map (s) ->
    if s.wrap
      section {className: 'cg-Card'}, s.children
    else
      s.children

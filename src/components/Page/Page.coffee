reqwest = require('reqwest')
marked = require('react-marked')
React = require('react')
{Link} = require('react-nested-router')
{div, section} = React.DOM

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
      .then((res) => @setState children: MarkdownRenderer(res.responseText))
      .fail (res) =>
        @setState
          error: res.statusText
          children: null


#
# Markdown Renderer
#
MarkdownRenderer = (markdown) ->
  renderer = new marked.Renderer()
  renderer.heading = HeadingRenderer
  renderer.code = CodeRenderer

  children = marked markdown,
    renderer: renderer
    gfm: true
    breaks: false
    sanitize: false
    smartLists: true
    smartypants: true

  createSections(children)

CodeRenderer = (code, modifiers = '') ->
  className = "cg-CodeBlock"
  className += " cg-CodeBlock--#{modifiers}" if modifiers.length > 0
  section className: className, dangerouslySetInnerHTML: {__html: code}

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

  sections.map (s) ->
    if s.wrap
      section {className: 'cg-Card'}, s.children
    else
      s.children

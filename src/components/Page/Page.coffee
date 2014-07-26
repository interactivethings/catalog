reqwest = require('reqwest')
marked = require('react-marked')
React = require('react')
{Link} = require('react-nested-router')
{div, section} = React.DOM

module.exports = React.createClass

  getInitialState: ->
    error: null
    html: null

  componentDidMount: ->
    @fetchPageData(@props.src)

  render: ->
    if @state.error?
      div {}, "Error: #{@state.error}"
    else if @state.html?
      div {className: 'cg-Page'}, @state.html
    else
      div {className: 'cg-Page-loader'}

  fetchPageData: (src) ->
    reqwest(url: src, type: 'text')
      .then((res) => @setState html: MarkdownRenderer(res.responseText))
      .fail (res) =>
        @setState
          error: res.statusText
          html: null


#
# Markdown Renderer
#
MarkdownRenderer = (markdown) ->
    renderer = new marked.Renderer()
    renderer.heading = HeadingRenderer
    renderer.code = CodeRenderer

    html = marked markdown,
      renderer: renderer
      gfm: true
      breaks: false
      sanitize: false
      smartLists: true
      smartypants: true

    html = createSections(html)
    html

CodeRenderer = (code, modifiers = '') ->
  className = "cg-CodeBlock"
  className += " cg-CodeBlock--#{modifiers}" if modifiers.length > 0
  section className: className, dangerouslySetInnerHTML: {__html: code}

HeadingRenderer = (text, level) ->
  React.DOM["h#{level}"] null, text

createSections = (html) ->
  # firstpass = true
  # html = html.replace /<h2/g, (match) ->
  #   if firstpass
  #     firstpass = false
  #     "<section class='cg-Card'>#{match}"
  #   else
  #     "</section><section class='cg-Card'>#{match}"

  # html += "</section>" unless firstpass
  html

reqwest = require('reqwest')
marked = require('marked')
React = require('react')
{Link} = require('react-nested-router')
{div} = React.DOM

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
      div className: 'cg-Page', dangerouslySetInnerHTML: {__html: @state.html}
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
  "<section class='#{className}'>#{code}</section>"

HeadingRenderer = (text, level) ->
  "<h#{level}>#{text}</h#{level}>"

createSections = (html) ->
  firstpass = true
  html = html.replace /<h2/g, (match) ->
    if firstpass
      firstpass = false
      "<section class='cg-Card'>#{match}"
    else
      "</section><section class='cg-Card'>#{match}"

  html += "</section>" unless firstpass
  html

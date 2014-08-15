_ = require('lodash')
React = require('react')
{section} = React.DOM

module.exports = React.createClass
  componentDidMount:  -> @executeScripts()
  componentDidUpdate: -> @executeScripts()
  executeScripts: ->
    if @props.config.runscript
      _.each @getDOMNode().querySelectorAll('script'), executeScript

  render: ->
    section
      className: "cg-CodeBlock cg-CodeBlock--#{@props.config.style}"
      dangerouslySetInnerHTML: {__html: @props.code}


#
# Functions
#

# Executes a script that has been inserted through innerHTML
executeScript = (el) ->
  src = el.text or el.textContent or el.innerHTML or ""
  head = document.getElementsByTagName("head")[0] or document.documentElement
  script = document.createElement("script")
  script.setAttribute "type", "text/javascript"
  script.appendChild document.createTextNode(src)
  head.insertBefore script, head.firstChild
  head.removeChild script

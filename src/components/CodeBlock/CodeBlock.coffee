_ = require('lodash')
React = require('react')
{section} = React.DOM

module.exports = React.createClass
  componentDidMount:  -> @executeScripts()
  componentDidUpdate: -> @executeScripts()
  executeScripts: ->
    if @props.config.runscript
      _.each @getDOMNode().querySelectorAll('script'), Catalog.actions.runscript
  render: ->
    section
      className: "cg-CodeBlock cg-CodeBlock--#{@props.config.style}"
      dangerouslySetInnerHTML: {__html: @props.code}

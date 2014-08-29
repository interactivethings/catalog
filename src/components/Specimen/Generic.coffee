React = require('react')
{section} = React.DOM

module.exports = React.createClass
  render: ->
    section
      className: "cg-CodeBlock cg-CodeBlock--#{@props.style}"
      dangerouslySetInnerHTML: {__html: @props.content}

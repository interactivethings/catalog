React = require('react')
{section} = React.DOM

module.exports = React.createClass
  render: ->
    section
      className: "cg-Specimen-Generic cg-Specimen-Generic--#{@props.type}"
      dangerouslySetInnerHTML: {__html: @props.body}

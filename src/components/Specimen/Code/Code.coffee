React = require('react')
{section} = React.DOM

module.exports = React.createClass
  render: ->
    section
      className: "cg-Specimen-Code"
      dangerouslySetInnerHTML: {__html: @props.body}

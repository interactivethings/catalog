React = require('react')
{section} = React.DOM

module.exports = React.createClass
  render: ->
    section {className: 'cg-Card'}, @props.children

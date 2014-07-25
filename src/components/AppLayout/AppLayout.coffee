React = require('react')
{div, h1} = React.DOM

module.exports = React.createClass
  render: ->
    div {className: 'cg-AppLayout'},
      div {className: 'cg-AppLayout-topNav'},  @props.topNav
      div {className: 'cg-AppLayout-sideNav'}, @props.sideNav
      div {className: 'cg-AppLayout-content'}, @props.content

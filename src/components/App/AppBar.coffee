require('./AppBar.scss')

React = require('react')
{Link} = require('react-router')
{div, h1} = React.DOM

module.exports = React.createClass

  propTypes:
    title: React.PropTypes.string.isRequired

  render: ->
    div {className: 'cg-AppBar'},
      h1 {className: 'cg-AppBar-title'}, @props.title

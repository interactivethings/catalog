require('./Loader.scss')

React = require('react')
{div} = React.DOM

SHOW_AFTER_MS = 500

module.exports = React.createClass
  getInitialState: ->
    visible: false

  componentDidMount: ->
    @timeout = setTimeout (=> @setState visible: true), SHOW_AFTER_MS

  componentWillUnmount: ->
    clearTimeout(@timeout) if @timeout?

  render: ->
    if @state.visible
      div {className: 'cg-Page-Loader'}
    else
      null

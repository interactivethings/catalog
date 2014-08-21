React = require('react')
AppLayout = require('./AppLayout/AppLayout')
AppBar = require('./AppBar/AppBar')
Menu = require('./Menu/Menu')
{div, h1} = React.DOM

module.exports = React.createClass
  propTypes:
    title: React.PropTypes.string.isRequired
    pages: React.PropTypes.arrayOf(React.PropTypes.shape
      title: React.PropTypes.string.isRequired
      name:  React.PropTypes.string.isRequired
      src:   React.PropTypes.string.isRequired
      path:  React.PropTypes.string
    ).isRequired
    styles:  React.PropTypes.arrayOf(React.PropTypes.string)
    scripts: React.PropTypes.arrayOf(React.PropTypes.string)
    iframe:  React.PropTypes.bool

  getDefaultProps: ->
    styles: []
    scripts: []
    iframe: false

  render: ->
    AppLayout
      topNav:  AppBar(title: @props.title)
      sideNav: Menu(pages: @props.pages)
      content: @props.activeRouteHandler()

React = require('react')
AppLayout = require('./AppLayout/AppLayout')
AppBar = require('./AppBar/AppBar')
Menu = require('./Menu/Menu')
{div, h1} = React.DOM

module.exports = React.createClass
  render: ->
    AppLayout
      topNav:  AppBar(title: @props.title)
      sideNav: Menu(pages: @props.pages)
      content: @props.activeRouteHandler()

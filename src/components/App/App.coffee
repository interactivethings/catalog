React = require('react')
AppLayout = React.createFactory require('./AppLayout')
AppBar = React.createFactory require('./AppBar')
Menu = React.createFactory require('./Menu')
{div, h1} = React.DOM

RouteHandler = React.createFactory require('react-router').RouteHandler

module.exports = React.createClass
  propTypes:
    title: React.PropTypes.string.isRequired
    pages: React.PropTypes.arrayOf(React.PropTypes.shape
      title: React.PropTypes.string.isRequired
      name:  React.PropTypes.string.isRequired
      src:   React.PropTypes.string
      path:  React.PropTypes.string
    ).isRequired,
    page: React.PropTypes.object.isRequired,
    styles:  React.PropTypes.arrayOf(React.PropTypes.string)
    scripts: React.PropTypes.arrayOf(React.PropTypes.string)

  getDefaultProps: ->
    styles: []
    scripts: []

  render: ->
    AppLayout
      topNav:  AppBar(title: @props.title)
      sideNav: Menu(pages: @props.pages)
      content: RouteHandler(@props.page)

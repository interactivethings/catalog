require('./AppLayout.scss')

React = require('react')
{div, h1} = React.DOM

module.exports = React.createClass
  getInitialState: ->
    viewportHeight: window.innerHeight
    viewportWidth: window.innerWidth
    sidebarVisible: true

  componentDidMount: ->
    window.addEventListener 'resize', => @measure()

  measure: ->
    @setState
      viewportHeight: window.innerHeight
      viewportWidth: window.innerWidth

  componentWillUnmount: ->
    window.removeEventListener 'resize'

  render: ->
    topHeight = 66
    sideWidthDefault = 200
    sideWidth = if @state.sidebarVisible then sideWidthDefault else 0
    contentWidth = if @state.sidebarVisible then @state.viewportWidth - sideWidth else @state.viewportWidth
    contentHeight = @state.viewportHeight - topHeight

    div {className: 'cg-AppLayout'},
      div {className: 'cg-AppLayout-topNav', onClick: @toggleSidebar, style: {height: topHeight, width: sideWidthDefault}},  @props.topNav
      if @state.sidebarVisible
        div {className: 'cg-AppLayout-sideNav', style: {height: contentHeight, width: sideWidth, top: topHeight}}, @props.sideNav
      div {className: 'cg-AppLayout-content', style: {width: contentWidth, top: topHeight, left: sideWidth}}, @props.content

  toggleSidebar: ->
    @setState sidebarVisible: !@state.sidebarVisible

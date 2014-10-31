require('./Menu.scss')

React = require('react')
{ActiveState, Link} = require('react-router')
{div, ul, li} = React.DOM

module.exports = React.createClass
  render: ->
    div
      className: 'cg-Menu'
      ul
        className: 'cg-Menu-list'
        @props.pages.map (page) ->
          ListItem _.extend(key: page.name, page)

ListItem = React.createClass
  render: ->
    li
      key: @props.name
      className: 'cg-Menu-list-item'
      if @props.pages?
        NestedList(@props)
      else
        Link to: @props.name, className: 'cg-Menu-link', @props.title

NestedList = React.createClass
  mixins: [ActiveState]

  getInitialState: ->
    collapsed: false

  updateActiveState: ->
    hasActiveChild = @props.pages
      .map((d) -> NestedList.isActive(d.name))
      .filter((d) -> d is true)
      .length > 0
    @setState
      collapsed: !hasActiveChild

  render: ->
    div {},
      div
        className: "cg-Menu-link #{'cg-Menu-link--children' unless @state.collapsed}"
        onClick: @toggleChildren
        @props.title
      unless @state.collapsed
        ul
          className: 'cg-Menu-list cg-Menu-list--nested'
          @props.pages.map (page) ->
            ListItem _.extend(key: page.name, page)

  toggleChildren: ->
    @setState collapsed: !@state.collapsed

React = require('react')
{Link} = require('react-nested-router')
{div, ul, li} = React.DOM

module.exports = React.createClass
  render: ->
    div {className: 'cg-Menu'},
      ul {className: 'cg-Menu-list'},
        @props.pages.map (page) ->
          li {key: page.name, className: 'cg-Menu-list-item'},
            Link to: page.name, className: 'cg-Menu-link', page.title

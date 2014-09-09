require('./Color.scss')

React = require('react')
{div, section, span} = React.DOM

seqKey = require('../../../utils/seqKey')('cg-Specimen-Color')

module.exports = React.createClass
  render: ->
    section
      className: "cg-Specimen-Color"
      @props.colors.map (def) ->
        div
          key: seqKey()
          className: 'cg-Specimen-Color-well'
          style:
            backgroundColor: def.value
          span {className: 'cg-Specimen-Color-label'}, def.name

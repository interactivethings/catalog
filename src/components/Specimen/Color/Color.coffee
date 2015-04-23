require('./Color.scss')

React = require('react')
MetadataBlock = require('../shared/MetadataBlock');
{div, section, span} = React.DOM

seqKey = require('../../../utils/seqKey')('cg-Specimen-Color')

module.exports = React.createClass
  render: ->
    section
      className: "cg-Specimen-Color"
      @props.colors.map (def) ->
        div
          key: seqKey()
          className: "cg-Specimen-Color-container"
          div
            className: "cg-Specimen-Color-well"
            style:
              backgroundColor: def.value
          div
            className: 'cg-Specimen-Color-info'
            MetadataBlock({title: def.name, attributes: [def.value]})

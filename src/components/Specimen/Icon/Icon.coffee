require('./Icon.scss')

cx = require('classnames');
React = require('react')
{div, img, section, span} = React.DOM
MetadataBlock = require('../shared/MetadataBlock');

seqKey = require('../../../utils/seqKey')('cg-Specimen-Icon')

module.exports = React.createClass
  render: ->
    section
      className: "cg-Specimen-Icon"
      @props.icons.map (def) ->
        imgSize =
          height: if def.size?.height? then def.size.height else 'auto'
          width:  if def.size?.width? then def.size.width else 'auto'
        metadata =
          title: def.title
          attributes: [].concat(def.attributes ? [])
          links: [].concat(def.links ? []).concat(def.link ? [])
        hasMetadata = (metadata.title? or metadata.attributes.length > 0 or metadata.links > 0)
        console.log 'META', metadata

        div
          key: seqKey()
          className: cx({
            "cg-Specimen-Icon-container": true,
            "cg-Specimen-Icon-container--align-vertical": def.align is "vertical"
          })
          div
            className: 'cg-Specimen-Icon-image'
            img
              src: def.image
              style: imgSize
          if hasMetadata
            div
              className: 'cg-Specimen-Icon-info'
              MetadataBlock(metadata)

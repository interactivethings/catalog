require('./UISpec.scss')

React = require('react')
{a, div, h2, img, li, section, ul} = React.DOM
MetadataBlock = React.createFactory require('../shared/MetadataBlock');

Image = React.createFactory React.createClass
  render: ->
    div
      className: "cg-Specimen-UISpec-Image"
      img(className: "cg-Specimen-UISpec-Image-main", src: @props.src)
      if @props.overlay?
        img(className: "cg-Specimen-UISpec-Image-overlay", src: @props.overlay)

UISpecItem = React.createFactory React.createClass
  render: ->
    style = {}
    if @props.span?
      style.flex = @props.span
      style.minWidth = @props.span * 300
    div {className: "cg-Specimen-UISpec-Item", style: style},
      Image(src: @props.image.src, overlay: @props.overlay?.src) if @props.image?
      MetadataBlock(@props)


module.exports = React.createClass
  normalizedEntries: ->
    parseImage = (img) ->
      switch (typeof img)
        when 'undefined' then null
        when 'string' then {src: img}
        else throw "Image objects are not supported yet"

    @props.entries.map (entry, i) =>
      key: i,
      title: entry.title
      image: parseImage(entry.image)
      overlay: parseImage(entry.overlay)
      attributes: [].concat(entry.attributes ? [])
      links: [].concat(entry.links ? []).concat(entry.link ? [])
      span: entry.span

  render: ->
    section
      className: "cg-Specimen-UISpec"
      @normalizedEntries().map(UISpecItem)

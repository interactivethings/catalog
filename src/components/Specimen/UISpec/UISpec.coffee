require('./UISpec.scss')

React = require('react')
{a, div, h2, img, li, section, ul} = React.DOM
MetadataBlock = require('../shared/MetadataBlock');

Image = React.createClass
  render: ->
    img(className: "cg-Specimen-UISpec-Image", src: @props.src)

UISpecItem = React.createClass
  render: ->
    style = {}
    if @props.span?
      style.flex = @props.span
      style.minWidth = @props.span * 300
    div {className: "cg-Specimen-UISpec-Item", style: style},
      Image(src: @props.image.src) if @props.image?
      MetadataBlock(@props)


module.exports = React.createClass
  normalizedEntries: ->
    parseImage = (img) ->
      switch (typeof img)
        when 'undefined' then null
        when 'string' then {src: img}
        else throw "Image objects are not supported yet"

    @props.entries.map (entry) =>
      title: entry.title
      image: parseImage(entry.image)
      attributes: [].concat(entry.attributes ? [])
      links: [].concat(entry.links ? []).concat(entry.link ? [])
      span: entry.span

  render: ->
    section
      className: "cg-Specimen-UISpec"
      @normalizedEntries().map(UISpecItem)

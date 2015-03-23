require('./UISpec.scss')

React = require('react')
{a, div, h2, img, li, section, ul} = React.DOM


Image = React.createClass
  render: ->
    img(className: "cg-Specimen-UISpec-Image", src: @props.src)

Attributes = React.createClass
  render: ->
    ul {},
      @props.attributes.map (attr, i) =>
        li {key: "attr-#{i}"}, attr

Links = React.createClass
  render: ->
    ul {},
      @props.links.map (href, i) =>
        li {key: "href-#{i}"}, a(href: href, href)

MetadataBlock = React.createClass
  render: ->
    div {className: "cg-Specimen-UISpec-Metadata"},
      h2({}, @props.title) if @props.title?
      Attributes(attributes: @props.attributes) if @props.attributes?
      Links(links: @props.links) if @props.links

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
      attributes: [].concat(entry.attributes)
      links: [].concat(entry.links).concat(entry.link)
      span: entry.span

  render: ->
    section
      className: "cg-Specimen-UISpec"
      @normalizedEntries().map(UISpecItem)

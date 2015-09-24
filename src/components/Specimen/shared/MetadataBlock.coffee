require('./MetadataBlock.scss')

React = require('react')
{a, div, h2, img, li, section, ul} = React.DOM

Attributes = React.createFactory React.createClass
  render: ->
    ul {},
      @props.attributes.map (attr, i) =>
        li {key: "attr-#{i}"}, attr

Links = React.createFactory React.createClass
  render: ->
    ul {},
      @props.links.map (href, i) =>
        li {key: "href-#{i}"}, a(href: href, href)

module.exports = React.createClass
  render: ->
    div {className: "cg-Specimen-shared-MetadataBlock"},
      h2({}, @props.title) if @props.title?
      Attributes(attributes: @props.attributes) if @props.attributes?.length > 0
      Links(links: @props.links) if @props.links?.length > 0

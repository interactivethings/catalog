_ = require('lodash')
React = require('react')
SpecimenGeneric = require('../Specimen/Generic')
SpecimenProject = require('../Specimen/Project')
{a, div, iframe, section} = React.DOM

module.exports = React.createClass
  componentDidMount:  -> @executeScripts()
  componentDidUpdate: -> @executeScripts()
  executeScripts: ->
    if @props.config.runscript
      _.each @getDOMNode().querySelectorAll('script'), Catalog.actions.runscript

  render: ->
    if @props.config.style is 'specimen-project'
      SpecimenProject(JSON.parse(@props.code))
    else
      SpecimenGeneric(style: @props.config.style, content: @props.code)

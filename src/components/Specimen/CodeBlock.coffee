_ = require('lodash')
React = require('react')
SpecimenGeneric = require('./Generic')
SpecimenProject = require('./Project')
{a, div, iframe, section} = React.DOM

module.exports = React.createClass
  componentDidMount:  -> @executeScripts()
  componentDidUpdate: -> @executeScripts()
  executeScripts: ->
    if @props.runscript
      _.each @getDOMNode().querySelectorAll('script'), Catalog.actions.runscript

  render: ->
    if @props.specimen is 'specimen-project'
      SpecimenProject(JSON.parse(@props.code))
    else
      SpecimenGeneric(style: @props.specimen, content: @props.code)

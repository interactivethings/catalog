React = require('react')

Code = require('./Code/Code')
Color = require('./Color/Color')
Generic = require('./Generic/Generic')
Project = require('./Project/Project')

module.exports = React.createClass
  statics:
    Config: (str = '') ->
      [specimen, optionsStr] = str.split('|')
      options = _.compact (optionsStr or '').split(',')

      specimen:  if _.isEmpty(specimen) then 'bg-light-pattern' else specimen
      runscript: _.include options, 'run-script'
      fullbleed: _.include options, 'fullbleed'

  componentDidMount:  -> @executeScripts()
  componentDidUpdate: -> @executeScripts()
  executeScripts: ->
    if @props.config.runscript
      _.each @getDOMNode().querySelectorAll('script'), Catalog.actions.runscript

  render: ->
    switch @props.config.specimen
      when 'specimen-code'
        Code(body: @props.body)
      when 'specimen-color'
        Color(colors: JSON.parse(@props.body))
      when 'specimen-project'
        Project(JSON.parse(@props.body))
      else
        Generic(body: @props.body, type: @props.config.specimen)

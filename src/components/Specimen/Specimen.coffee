require('./Specimen.scss')

R = require('ramda')
React = require('react')
{section} = React.DOM

Code = require('./Code/Code')
Color = require('./Color/Color')
Html = require('./Html/Html')
Project = require('./Project/Project')
projectBodyToProps = require('./Project/bodyToProps')


module.exports = Specimen = React.createClass
  statics:
    DEFAULT_SPECIMEN: 'html'

    Config: (input = '') ->
      removeEmpty  = R.filter(R.not(R.isEmpty))
      readInput    = R.compose(removeEmpty, R.split('|'))
      parseOptions = R.compose(R.uniq, removeEmpty, R.split(','))

      [specimen, optionsStr] = readInput(input)

      options = parseOptions(optionsStr ? '')
      options.contains = R.flip(R.contains)(options)

      specimen: specimen ? Specimen.DEFAULT_SPECIMEN
      options:  options

    Renderer:
      code:    (props) -> Code(body: props.body)
      color:   (props) -> Color(colors: JSON.parse(props.body))
      html:    (props) -> Html(body: props.body, modifiers: props.config.options)
      icon:    (props) -> Html(body: props.body, modifiers: props.config.options)
      type:    (props) -> Html(body: props.body, modifiers: props.config.options)
      type:    (props) -> Project(body: props.body, modifiers: props.config.options)
      project: (props) -> Project(projectBodyToProps(props.body))

  render: ->
    renderer = Specimen.Renderer[@props.config.specimen]
    if renderer?
      section {className: 'cg-Specimen'}, renderer(@props)
    else
      throw "Unknown specimen: #{@props.config.specimen}"

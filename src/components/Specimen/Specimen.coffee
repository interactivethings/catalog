require('./Specimen.scss')

R = require('ramda')
React = require('react')
{section} = React.DOM

Code = React.createFactory require('./Code/Code')
Color = React.createFactory require('./Color/Color')
Html = React.createFactory require('./Html/Html')
Icon = React.createFactory require('./Icon/Icon')
Project = React.createFactory require('./Project/Project')
UISpec = React.createFactory require('./UISpec/UISpec')
DownloadSpecimen = React.createFactory require('./DownloadSpecimen/DownloadSpecimen')
projectBodyToProps = require('./Project/bodyToProps')


module.exports = Specimen = React.createClass
  statics:
    DEFAULT_SPECIMEN: 'html'

    Config: (input = '') ->
      removeEmpty  = R.filter(R.complement(R.isEmpty))
      readInput    = R.compose(removeEmpty, R.split('|'))
      parseOptions = R.compose(R.uniq, removeEmpty, R.split(','))

      [specimen, optionsStr] = readInput(input)

      options = parseOptions(optionsStr ? '')
      options.contains = R.flip(R.contains)(options)

      specimen: specimen ? Specimen.DEFAULT_SPECIMEN
      options:  options

    Renderer:
      code:    (props) -> Code({ body: props.body, theme: props.theme })
      color:   (props) -> Color({ colors: JSON.parse(props.body), theme: props.theme })
      html:    (props) -> Html({ body: props.body, modifiers: props.config.options, theme: props.theme })
      icon:    (props) -> Icon({ icons: [].concat(JSON.parse(props.body)), theme: props.theme })
      type:    (props) -> Html({ body: props.body, modifiers: props.config.options, theme: props.theme })
      uispec:  (props) -> UISpec({ entries: JSON.parse(props.body), theme: props.theme })
      project: (props) -> Project(R.merge(projectBodyToProps(props.body), { theme: props.theme }))
      download: (props) -> DownloadSpecimen(R.merge(JSON.parse(props.body), { theme: props.theme }))

  render: ->
    renderer = Specimen.Renderer[@props.config.specimen]
    if renderer?
      section {className: 'cg-Specimen'}, renderer(@props)
    else
      throw "Unknown specimen: #{@props.config.specimen}"

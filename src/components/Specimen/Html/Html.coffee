require('./Html.scss')

R = require('ramda')
React = require('react')
{section} = React.DOM


module.exports = Html = React.createClass
  statics:
    NAMESPACE: 'cg-Specimen-Html'
    MODIFIERS: ['light', 'dark', 'plain']

  componentDidMount:  ->
    if @props.modifiers.contains('run-script')
      _.each @getDOMNode().querySelectorAll('script'), Catalog.actions.runscript

  render: ->
    modifierClassNames = modifierList(@props.modifiers.contains, Html.MODIFIERS)
    section
      className: [Html.NAMESPACE].concat(modifierClassNames).join(' ')
      dangerouslySetInnerHTML: {__html: @props.body}

modifierList = R.compose(R.map(R.add("#{Html.NAMESPACE}--")), R.filter)

require('./Html.scss')

R = require('ramda')
React = require('react')
{div, pre} = React.DOM


module.exports = Html = React.createClass
  statics:
    NAMESPACE: 'cg-Specimen-Html'
    MODIFIERS: ['light', 'dark', 'plain']

  getInitialState: ->
    viewSource: false

  componentDidMount:  ->
    if @props.modifiers.contains('run-script')
      _.each @getDOMNode().querySelectorAll('script'), Catalog.actions.runscript

  render: ->
    div
      className: blockClass()
      unless @props.modifiers.contains('no-source')
        div
          className: elementClass('toggle')
          onClick: @toggleSource
          title: if @state.viewSource then "Hide source" else "Show source"
          dangerouslySetInnerHTML: {__html: "&lt;&gt;"}
      div
        className: [elementClass('content')].concat(@modifiers(modifierClass('content'))).join(' ')
        dangerouslySetInnerHTML: {__html: @props.body}
      if @state.viewSource
        pre
          className: elementClass('source')
          @props.body

  modifiers: (transform = R.identity) ->
    R.map transform, R.filter(@props.modifiers.contains, Html.MODIFIERS)

  toggleSource: ->
    @setState(viewSource: !@state.viewSource)


blockClass    = -> Html.NAMESPACE
elementClass  = R.add("#{blockClass()}-")
modifierClass = R.curry (element, modifier) ->
  "#{either(elementClass, blockClass, element)}--#{modifier}"

either = R.curry (some, none, x) -> if x? then some(x) else none(x)

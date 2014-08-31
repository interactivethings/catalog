React = require('react')
CodeBlock = require('./CodeBlock')
FramedCodeBlock = require('./FramedCodeBlock')

seqKey = require('../../utils/seqKey')('cg-Specimen')

module.exports = React.createClass
  render: ->
    if @props.iframe and @props.specimen isnt 'code'
      FramedCodeBlock
        key: seqKey()
        code: code
        modifiers: modifiers
        styles: @props.styles
        # scripts: @props.scripts
    else
      CodeBlock _.extend {key: seqKey()}, @props

React = require('react')
CodeBlock = require('./CodeBlock')
FramedCodeBlock = require('./FramedCodeBlock')

seqKey = require('../../utils/seqKey')('cg-Specimen')

module.exports = (props) ->
  (code, configStr = '') ->
    config = consumeConfigStr(configStr)
    if props.iframe and config.style isnt 'code'
      FramedCodeBlock
        key: seqKey()
        code: code
        modifiers: modifiers
        styles: props.styles
        # scripts: props.scripts
    else
      CodeBlock
        key: seqKey()
        code: code
        config: config

consumeConfigStr = (str) ->
  [style, optionsStr] = str.split('|')
  options = _.compact (optionsStr or '').split(',')

  style: style
  runscript: _.include options, 'run-script'
  fullbleed: _.include options, 'fullbleed'

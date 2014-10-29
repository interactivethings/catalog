React = require('react')
reqwest = require('reqwest')
{button, div, textarea} = React.DOM


module.exports = React.createClass
  getInitialState: ->
    tab: null
    sourceCode: null

  getDefaultProps: ->
    files: []

  componentDidMount: ->
    @loadSourceCode()

  componentDidUpdate: ->
    @loadSourceCode() unless @state.sourceCode?

  render: ->
    div {},
      if @props.files.length > 1
        @props.files.map (file, i) =>
          button
            key: i
            'data-tab-id': i
            onClick: @selectTab
            file.target

      if @state.tab?
        textarea
          className: 'cg-Specimen-Project-source'
          value: if @state.sourceCode? then @state.sourceCode else 'Loading …'
          readOnly: true

  selectTab: (evt) ->
    nextTab = +evt.currentTarget.getAttribute('data-tab-id')
    @setState
      sourceCode: null
      tab: if nextTab is @state.tab then null else nextTab

  loadSourceCode: ->
    return unless @state.tab?

    file = @props.files[@state.tab]

    requests = [reqwest(url: file.source, type: 'text')]
    requests.push(reqwest(url: file.template, type: 'text')) if file.template?

    Promise.all(requests)
      .then((res) =>
        content = res.map((d) -> d.responseText)
        @setState sourceCode: parseSourceCode(content...)
      )
      .catch (res) =>
        @setState
          error: res.statusText
          children: null


#
# Utils
#

parseSourceCode = (source, template) ->
  if template?
    doc = new DOMParser().parseFromString(source, 'text/html');
    template.replace('${yield}', doc.body.innerHTML)
  else
    source

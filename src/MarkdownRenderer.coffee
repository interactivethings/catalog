_ = require('lodash')
marked = require('../lib/react-markdown')

MARKDOWN_CONFIG =
  gfm: true
  breaks: false
  sanitize: false
  smartLists: true
  smartypants: true

module.exports = (options) ->
  renderer = new marked.Renderer()
  for type, handler of (options.renderer or {})
    renderer[type] = handler

  markedOptions = _.extend(renderer: renderer, MARKDOWN_CONFIG)
  marked(options.text, markedOptions)
    .reduce(splitIntoSections, [[]])
    .map(wrapSection(options.section))


# Splits an array of DOM nodes into sections at each <h2>
# [h1, p, h2, p, p, h2, p] -> [[h1, p], [h2, p, p], [h2, p]]
splitIntoSections = (sections, node) ->
  if node.type is 'h2'             # Caveat: this is a private React API call
    sections.push([node])          # Start a new section
  else
    _.last(sections).push(node)    # Append to current section
  sections

# Wraps all sections except the first in a section component
wrapSection = (sectionComponent) ->
  (nodes, i) ->
    if i is 0 then nodes else sectionComponent(nodes)

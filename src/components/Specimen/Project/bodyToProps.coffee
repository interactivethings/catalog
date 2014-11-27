sprout = require('sprout-data')

#
# {
#   source
#   template
# }
#

INDEX = 'index.html'

DEFAULTS =
  name: 'project'
  files: {}
  scrolling: 'no'
  size:
    height: 500
    width: '100%'


module.exports = (body) ->
  config = sprout.merge DEFAULTS, JSON.parse(body)

  # An index property must be available at one of these locations:
  #
  #   - index (deprecated)
  #   - index.html
  #   - files/index.html
  #
  # It will be moved to files/index.html
  index = null

  if config['index']?
    console.warn('Deprecated: use "index.html" instead of "index"')
    index = config['index']
    delete config['index']

  if config[INDEX]?
    console.warn('Index document was already defined and will be overwritten') if index?
    index = config[INDEX]
    delete config[INDEX]

  if config.files[INDEX]?
    console.warn('Index document was already defined and will be overwritten') if index?
    index = config.files[INDEX]

  unless index?
    throw new Error('"index.html" must be defined')

  config = sprout.assoc config, ['files', INDEX], index

  # All files need to have the same interface
  files = []
  for target, source of config.files
    file = if typeof source is 'string' then {source: source} else source
    file.target = target unless file.target?
    file.template = null unless file.template?

    # Reference index file
    config.index = file if file.target is INDEX

    files.push(file)

  config.files = files


  # Parse size
  config.size = parseSize(config.size)


  # Return config
  config


#
# Utils
#

parseSize = (size) ->
  {width, height} = size
  height = "#{height}px" if typeof height is 'number'
  width  = "#{width}px"  if typeof width  is 'number'
  {width, height}

{Promise} = require('es6-promise')

#
# Sequentially runs scripts as they are added
#
module.exports = ->
  current = null
  queue = []

  enqueue = (handler) ->
    if current?
      queue.push(handler)
    else
      dequeue(handler)

  dequeue = (handler) ->
    current = handler()
    current.then ->
      current = null
      dequeue(queue.shift()) if queue.length > 0
    current.catch ->
      console.error 'Error loading script'

  execRemote = (src) ->
    ->
      new Promise (resolve, reject) ->
        execScript (script) ->
          script.onload = resolve
          script.onerror = reject
          script.setAttribute 'src', src

  execInline = (src) ->
    ->
      new Promise (resolve, reject) ->
        execScript (script) ->
          script.appendChild document.createTextNode(src)
          resolve()

  execScript = (decorate) ->
    script = document.createElement('script')
    script.setAttribute 'type', 'text/javascript'
    decorate(script)
    head = document.getElementsByTagName('head')[0] or document.documentElement
    head.insertBefore script, head.firstChild
    head.removeChild script

  # Public API
  (srcOrEl) ->
    if _.isString(srcOrEl) and !_.isEmpty(srcOrEl.trim())
      enqueue(execRemote(srcOrEl))
    if srcOrEl.textContent and !_.isEmpty(srcOrEl.textContent.trim())
      enqueue(execInline(srcOrEl.textContent))

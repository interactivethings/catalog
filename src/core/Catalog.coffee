_ = require('lodash')
React = require('react')
{Routes, Route, Redirect} = require('react-router')
runscript = require('../utils/runscript')
App = require('../components/App/App')
Page = require('../components/Page/Page')

Catalog = (config) ->
  router = Routes {location: 'hash'},
    Route _.extend(key: 'root', handler: App, config),
      config.pages.map (page) ->
        styles = _.uniq _.compact [].concat(config.styles).concat(page.styles)
        scripts = _.uniq _.compact [].concat(config.scripts).concat(page.scripts)
        Route _.extend(key: page.name, handler: Page, styles: styles, scripts: scripts, page)
    Redirect(from: '*', to: '/')

  React.renderComponent(router, document.body)

#
# Global actions
#
Catalog.actions =
  runscript: runscript()

module.exports = Catalog

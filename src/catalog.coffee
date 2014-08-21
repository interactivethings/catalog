# Include CSS in page
require('./catalog.scss')

# Load App
_ = require('lodash')
React = require('react')
{Routes, Route, Redirect} = require('react-router')
App = require('./components/App')
Page = require('./components/Page/Page')

window.Catalog = (config) ->
  router = Routes {location: 'hash'},
    Route _.extend(key: 'root', handler: App, config),
      config.pages.map (page) ->
        styles = _.uniq _.compact [].concat(config.styles).concat(page.styles)
        scripts = _.uniq _.compact [].concat(config.scripts).concat(page.scripts)
        Route _.extend(key: page.name, handler: Page, styles: styles, scripts: scripts, page)
    Redirect(from: '*', to: '/')

  React.renderComponent(router, document.body)

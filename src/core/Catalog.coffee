require('./Catalog.scss');

_ = require('lodash')
React = require('react')
{Routes, Route, Redirect} = require('react-router')
runscript = require('../utils/runscript')
App = require('../components/App/App')
Page = require('../components/Page/Page')

#
# Startup
#
module.exports.start = (selector, config) ->
  router = Routes {location: 'hash'},
    Route _.extend(key: 'root', handler: App, config),
      config.pages.map (page) ->
        styles = _.uniq _.compact [].concat(config.styles).concat(page.styles)
        scripts = _.uniq _.compact [].concat(config.scripts).concat(page.scripts)
        if page.pages?
          page.pages.map (subpage) ->
            styles = _.uniq _.compact [].concat(config.styles).concat(subpage.styles)
            scripts = _.uniq _.compact [].concat(config.scripts).concat(subpage.scripts)
            Route _.extend(key: subpage.name, handler: Page, styles: styles, scripts: scripts, subpage)
        else
          Route _.extend(key: page.name, handler: Page, styles: styles, scripts: scripts, page)
    Redirect(from: '*', to: '/')

  rootElement = document.querySelector(selector)
  rootElement.className += ' cg-Catalog'
  React.renderComponent(router, rootElement)

#
# Global actions
#
module.exports.actions =
  runscript: runscript()

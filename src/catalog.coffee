# Include CSS in page
require('./catalog.scss')

# Load App
_ = require('lodash')
React = require('react')
{Routes, Route, Redirect} = require('react-router')
App = require('./components/App')
Page = require('./components/Page/Page')

window.Catalog = (config) ->
  defaultPageOptions =
    handler: Page
    iframe: config.iframe or false
    styles: config.styles or []

  router = Routes {location: 'hash'},
    Route _.extend({handler: App}, config),
      config.pages.map((page) ->
        Route _.extend(key: page.name, defaultPageOptions, page)
      ).concat(Redirect({key: 'not-found', from: '*', to: '/'}))

  React.renderComponent(router, document.body)

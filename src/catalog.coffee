# Include CSS in page
require('./catalog.scss')

# Load App
_ = require('lodash')
React = require('react')
{Route} = require('react-nested-router')
App = require('./components/App')
Page = require('./components/Page/Page')

window.Catalog = (config) ->
  defaultPageOptions =
    handler: Page
    iframe: config.iframe or false
    styles: config.styles

  router = Route _.extend({handler: App}, config),
    config.pages.map (page) ->
      Route _.extend(key: page.name, defaultPageOptions, page)

  React.renderComponent(router, document.body)

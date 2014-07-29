# Include CSS in page
require('./catalog.scss')

# Load App
_ = require('lodash')
React = require('react')
{Route} = require('react-nested-router')
App = require('./components/App')
Page = require('./components/Page/Page')

window.Catalog = (config) ->
  router = Route _.extend({handler: App}, config),
    config.pages.map (page) ->
      Route _.extend key: page.name, handler: Page, styles: config.styles, page

  React.renderComponent(router, document.body)

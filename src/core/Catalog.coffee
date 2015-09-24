require('./Catalog.scss');

_ = require('lodash')
React = require('react')
Router = require('react-router')
runscript = require('../utils/runscript')

App = require('../components/App/App')
Page = require('../components/Page/Page')

{Route, Redirect, HashLocation} = require('react-router')
Route = React.createFactory Router.Route
Redirect = React.createFactory Router.Redirect

#
# Startup
#
module.exports.start = (selector, config) ->
  pageIndex = {}
  pageRoutes = []
  addPageRoute = (data) ->
    path = data.path || "/#{data.name}"
    pageIndex[path] = data
    route = Route
      handler: Page,
      name: data.name,
      key: data.key
      path: path
    pageRoutes.push route

  config.pages.forEach (page) ->
    styles = _.uniq _.compact [].concat(config.styles).concat(page.styles)
    scripts = _.uniq _.compact [].concat(config.scripts).concat(page.scripts)
    if page.pages?
      page.pages.map (subpage) ->
        styles = _.uniq _.compact [].concat(config.styles).concat(subpage.styles)
        scripts = _.uniq _.compact [].concat(config.scripts).concat(subpage.scripts)
        addPageRoute _.extend(styles: styles, scripts: scripts, key: subpage.name, subpage)
    else
      addPageRoute _.extend(styles: styles, scripts: scripts, key: page.name, page)

  routes = Route {handler: App}, [pageRoutes, Redirect(from: '*', to: '/', key: '404')]

  rootElement = document.querySelector(selector)
  rootElement.className += ' cg-Catalog'

  Router.run routes, HashLocation, (Root, state) =>
    React.render React.createElement(Root, _.extend(config, page: pageIndex[state.pathname])), rootElement

#
# Global actions
#
module.exports.actions =
  runscript: runscript()

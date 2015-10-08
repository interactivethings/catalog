import React from 'react';
import Router, { Route, Redirect, HashLocation } from 'react-router';
import runscript from 'utils/runscript';

import './Catalog.scss';

import App from 'components/App/App';
import Page from 'components/Page/Page';
import DefaultTheme from 'DefaultTheme';

//
// Startup
//
export function start(selector, config) {
  let pageIndex = {};
  let pageRoutes = [];
  const addPageRoute = (data) => {
    let path = data.path || `/${data.name}`;
    pageIndex[path] = data;
    let route = <Route path={path} handler={Page} key={data.key} name={data.name} />;
    pageRoutes.push(route);
  };

  config.pages.forEach(page => {
    let styles = _.uniq(_.compact([].concat(config.styles).concat(page.styles)));
    let scripts = _.uniq(_.compact([].concat(config.scripts).concat(page.scripts)));
    if (page.pages) {
      page.pages.map(subpage => {
        styles = _.uniq(_.compact([].concat(config.styles).concat(subpage.styles)));
        scripts = _.uniq(_.compact([].concat(config.scripts).concat(subpage.scripts)));
        addPageRoute({styles, scripts, key: subpage.name, superTitle: page.title, ...subpage});
      });
    } else {
      addPageRoute({styles, scripts, key: page.name, superTitle: config.title, ...page});
    }
  });

  const routes = (
    <Route handler={App}>
      { pageRoutes }
      <Redirect from='*' to='/' />
    </Route>
  );

  const rootElement = document.querySelector(selector);
  rootElement.className += ' cg-Catalog';

  const theme = {
    ...DefaultTheme,
    ...config.theme
  };

  Router.run(routes, HashLocation, (Root, state) => {
    React.render(
      <Root {...config} theme={theme} page={pageIndex[state.pathname]} />,
      rootElement
    );
  });
}

//
// Global actions
//
export const actions = {
  runscript: runscript()
};

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
  let pageList = [];
  let pageNames = [];

  function addPageRoute(data) {
    // Test to ensure it has a src property, meaning its a valid route, not just a grouping
    if (data.src) {    
      let path = data.path || `/${data.name}`;
      data.path = path;
      pageIndex[path] = data;

      let route = <Route path={path} handler={Page} key={data.key} name={data.name} />;
      pageRoutes.push(route);
      pageList.push(data);
      pageNames.push(data.name);
    }
  }

  let globalStyles = config.styles;
  let globalScripts = config.scripts;

  function gatherPages(superTitle, group) {
    let styles = _.uniq(_.compact([].concat(globalStyles).concat(group.styles)));
    let scripts = _.uniq(_.compact([].concat(globalScripts).concat(group.scripts)));
    addPageRoute({styles, scripts, key: group.name, superTitle, ...group });

    if (group.pages) {
      group.pages.forEach((p) => gatherPages(group.title, p));
    }
  }

  config.pages.forEach((mainPage) => gatherPages(config.title, mainPage));

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
    console.log(pageIndex[state.pathname], pageNames);

    React.render(
      <Root {...config} theme={theme} page={pageIndex[state.pathname]} pageNames={pageNames} pageList={pageList} />,
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

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect} from 'react-router';
import createHistory from 'history/lib/createHashHistory';

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
      const path = data.path || `/${data.name}`;
      data.path = path;
      pageIndex[path] = data;

      const route = {
        path,
        component: Page
      };

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

  const routes = {
    component: App,
    childRoutes: pageRoutes
  };

  const rootElement = document.querySelector(selector);
  rootElement.className += ' cg-Catalog';

  const theme = {
    ...DefaultTheme,
    ...config.theme
  };

  ReactDOM.render(
    <Router history={createHistory()} routes={routes} createElement={(Component, props) => {
      return <Component key={Math.random()} {...props} title={config.title} superTitle={config.title} theme={theme} page={pageIndex[props.location.pathname]} pageNames={pageNames} pages={pageList} />;
    }} />,
    rootElement
  );
}

//
// Global actions
//
export const actions = {
  runscript: runscript()
};

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import parseConfiguration from './parseConfiguration';

import runscript from 'utils/runscript';

import './Catalog.scss';

import App from 'components/App/App';
import Page from 'components/Page/Page';
import DefaultTheme from 'DefaultTheme';


//
// Startup
//
export function start(selector, config) {
  const {pages, pageList, pageIndex, pageNames} = parseConfiguration(config);

  const pageRoutes = pageList.map((page) => {
    if (!page.src) {
      return false;
    }

    return {
      path: page.path,
      component: Page
    };
  }).filter(Boolean);

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
      return <Component key={Math.random()} {...props} title={config.title} superTitle={config.title} theme={theme} logoSrc={config.logoSrc} page={pageIndex[props.location.pathname]} pageNames={pageNames} pages={pages} pageList={pageList} />;
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

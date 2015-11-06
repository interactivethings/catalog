/* eslint-disable react/prop-types */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import parseConfiguration from './parseConfiguration';

import runscript from 'utils/runscript';

import './Catalog.css';

import CatalogContext from 'components/CatalogContext';
import Page from 'components/Page/ContextPage';


//
// Startup
//
export function start(selector, config) {
  const {pages} = parseConfiguration(config);

  const pageRoutes = pages.map((page) => {
    return {
      path: page.path,
      component: Page
    };
  });

  const routes = {
    component: CatalogContext(config),
    childRoutes: pageRoutes
  };

  const rootElement = document.querySelector(selector);
  rootElement.className += ' cg-Catalog';


  ReactDOM.render(
    <Router history={createHistory()} routes={routes} />,
    rootElement
  );
}

//
// Global actions
//
export const actions = {
  runscript: runscript()
};

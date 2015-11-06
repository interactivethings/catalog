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
  const {pages, pageList, pageIndex} = parseConfiguration(config);

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

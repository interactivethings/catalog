import React from 'react';
import ReactDOM from 'react-dom';
import {applyRouterMiddleware, browserHistory, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import {useScroll} from 'react-router-scroll';

import CatalogRoot from './components/CatalogRoot';


function createHistory(useBrowserHistory) {
  return useBrowserHistory
    ? browserHistory
    : useRouterHistory(createHashHistory)({queryKey: false});
}

export default (configuration, element) => {
  ReactDOM.render(
    <CatalogRoot
      reactRouterHistory={createHistory(configuration.useBrowserHistory)}
      reactRouterRender={applyRouterMiddleware(useScroll())}
      radiumConfig={{}}
      catalogConfig={configuration} />,
    element
  );
};

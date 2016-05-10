import React from 'react';
import ReactDOM from 'react-dom';
import {Router, useRouterHistory, applyRouterMiddleware} from 'react-router';
import {createHashHistory} from 'history';
import useScroll from 'react-router-scroll';
import seqKey from './utils/seqKey';

import configureRoutes from './configureRoutes';

const history = useRouterHistory(createHashHistory)({queryKey: false});

const getKey = seqKey('CatalogRouter');

export default (config, element) => {
  ReactDOM.render(
    <Router key={getKey()} history={history} routes={configureRoutes(config)} render={applyRouterMiddleware(useScroll())} />,
    element
  );
};

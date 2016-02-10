import React from 'react';
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import useScroll from 'scroll-behavior/lib/useSimpleScroll';
import seqKey from './utils/seqKey';

import configureRoutes from './configureRoutes';

const history = useRouterHistory(useScroll(createHashHistory))({queryKey: false});

const getKey = seqKey('CatalogRouter');

export default (config, element) => {
  ReactDOM.render(
    <Router key={getKey()} history={history} routes={configureRoutes(config)} />,
    element
  );
};

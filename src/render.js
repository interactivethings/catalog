import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import useScroll from 'scroll-behavior/lib/useSimpleScroll';
import seqKey from './utils/seqKey';

import configureRoutes from './configureRoutes';

const history = useScroll(createHistory)({queryKey: false});

const getKey = seqKey('CatalogRouter');

export default (config, element) => {
  ReactDOM.render(
    <Router key={getKey()} history={history} routes={configureRoutes(config)} />,
    element
  );
};

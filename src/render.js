import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import useScroll from 'scroll-behavior/lib/useSimpleScroll';

import configureRoutes from './configureRoutes';

export default (config, element) => {
  ReactDOM.render(
    <Router history={useScroll(createHistory)({queryKey: false})} routes={configureRoutes(config)} />,
    element
  );
};

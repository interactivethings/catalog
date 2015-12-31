import React from 'react';
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import useScroll from 'scroll-behavior/lib/useSimpleScroll';

import configure from './configure';
import configureRoutes from './configureRoutes';

export default (config, element) => {
  ReactDOM.render(
    <Router history={useRouterHistory(useScroll(createHashHistory))({queryKey: false})} routes={configureRoutes(configure(config))} />,
    element
  );
};

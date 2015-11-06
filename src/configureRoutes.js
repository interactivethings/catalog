import React from 'react';
import {Route} from 'react-router';
import CatalogContext from 'components/CatalogContext';
import Page from 'components/Page/ContextPage';

const pageToRoute = ({path}) => ({
  component: Page,
  path
});

const pageToJSXRoute = ({path}) => <Route key={path} path={path} component={Page} />;

export default (config) => ({
  component: CatalogContext(config),
  childRoutes: config.pages.map(pageToRoute)
});

export const jsx = (config) => (
  <Route component={CatalogContext(config)}>
    {config.pages.map(pageToJSXRoute)}
  </Route>
);

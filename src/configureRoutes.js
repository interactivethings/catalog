import React from 'react';
import {Route} from 'react-router';
import CatalogContext from './components/CatalogContext';
import Page from './components/Page/ContextPage';
import PageRenderer from './components/Page/PageRenderer';

const wrapComponent = (Component) => {
  const WrappedComponent = () => <PageRenderer content={<Component />} />;
  return WrappedComponent;
};

const pageToRoute = ({path, component}) => ({
  component: component ? wrapComponent(component) : Page,
  path
});

const pageToJSXRoute = ({path, component}) => <Route key={path} path={path} component={component ? wrapComponent(component) : Page} />;

export default (config) => ({
  component: CatalogContext(config),
  childRoutes: config.pages.map(pageToRoute)
});

export const jsx = (config) => (
  <Route component={CatalogContext(config)}>
    {config.pages.map(pageToJSXRoute)}
  </Route>
);

import React from 'react';
import {Route} from 'react-router';
import CatalogContext from './components/CatalogContext';
import PageContentLoader from './components/Page/PageContentLoader';
import PageRenderer from './components/Page/PageRenderer';

const wrapComponent = (Component) => {
  const WrappedComponent = () => <PageRenderer content={<Component />} />;
  return WrappedComponent;
};

const pageToRoute = ({path, component}) => ({
  component: component ? wrapComponent(component) : PageContentLoader,
  path
});

const pageToJSXRoute = ({path, component}) => <Route key={path} path={path} component={component ? wrapComponent(component) : PageContentLoader} />;

export default (config) => ({
  component: CatalogContext(config),
  childRoutes: config.pages.map(pageToRoute)
});

export const configureJSXRoutes = (config) => (
  <Route component={CatalogContext(config)}>
    {config.pages.map(pageToJSXRoute)}
  </Route>
);

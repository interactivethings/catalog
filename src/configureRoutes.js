import React from 'react';
import {Route} from 'react-router';
import configure from './configure';
import warning from './utils/warning';
import requireModuleDefault from './utils/requireModuleDefault';
import CatalogContext from './components/CatalogContext';
import ContentLoader from './ContentLoader';

const pageToRoute = ({path, component, src}) => ({
  component: component ? requireModuleDefault(component) : ContentLoader(src),
  path
});

const pageToJSXRoute = ({path, component, src}) => <Route key={path} path={path} component={component ? requireModuleDefault(component) : ContentLoader(src)} />; // eslint-disable-line react/prop-types

const autoConfigure = (config) => {
  warning(
    !config.__catalogConfig,
    'The `configure` function is deprecated; use `configureRoutes` or `configureJSXRoutes` directly.'
  );

  return config.__catalogConfig ? config : configure(config);
};

export default (config) => {
  const finalConfig = autoConfigure(config);
  return {
    component: CatalogContext(finalConfig),
    childRoutes: finalConfig.pages.map(pageToRoute)
  };
};

export const configureJSXRoutes = (config) => {
  const finalConfig = autoConfigure(config);
  return (
    <Route component={CatalogContext(finalConfig)}>
      {finalConfig.pages.map(pageToJSXRoute)}
    </Route>
  );
};

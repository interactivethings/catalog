import React from 'react';
import {Route} from 'react-router';
import configure from './configure';
import warning from './utils/warning';
import requireModuleDefault from './utils/requireModuleDefault';
import CatalogContext from './components/CatalogContext';
import PageContent from './components/Page/PageContent';
import {fetchMarkdown, reactComponent} from './content';

const pageComponent = (page) => {
  if (page.content) {
    return (props) => <PageContent {...props} contentPromiseFn={page.content} />;
  }
  if (page.src) {
    return (props) => <PageContent {...props} contentPromiseFn={fetchMarkdown(page.src)} />;
  }
  if (page.component) {
    return (props) => <PageContent {...props} contentPromiseFn={reactComponent(requireModuleDefault(page.component))} />;
  }

  return () => (
    <div>
      pageComponent: Wrong page configuration: neither content, src, nor component was specified.
    </div>
  );
};

const pageToRoute = (page) => ({
  component: pageComponent(page),
  path: page.path
});

const pageToJSXRoute = (page) =>
  <Route key={page.path} path={page.path} component={pageComponent(page)} />; // eslint-disable-line react/prop-types

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

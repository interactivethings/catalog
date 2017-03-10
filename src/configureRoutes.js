import React from 'react';
import {Route} from 'react-router';
import configure from './configure';
import warning from './utils/warning';
import requireModuleDefault from './utils/requireModuleDefault';
import CatalogContext from './components/CatalogContext';
import PageContent from './components/Page/PageContent';
import Page from './components/Page/Page';
import fetchMarkdown, {fetchMarkdownNoCatch} from './fetchMarkdown';

// Use heuristic to detect of the value is a valid react component
// (a value which can be given as the first argument to React.createElement()).
//
// It works like this: if it's a constructor and the instance has a 'render'
// function it's good. That handles both ES6 classes and components created
// with createClass(). And because we're not using instanceof checks, we're
// independent of the React library which the user is using (might be
// different from the one used by Catalog itself).
const isReactComponent = (X) => {
  try {
    const v = new X();
    return v !== null && typeof v === 'object' && typeof v.render === 'function';
  } catch (e) {
    return false;
  }
};

const pageComponent = (page) => {
  // page.content can be almost anything (as long as it's truthy) and
  // we'll do our best to render it.
  if (page.content) {
    const content = page.content;

    const gaveUpPage = () =>
      <Page>{`\`\`\`hint|warning\n# Catalog: I gave up.\n\n I don't know how to handle this page content: "${content}"\n\`\`\``}</Page>;

    return (props) => {
      // This function takes anything and returns a Promise which resolves
      // to a React$Element. It's magic.
      const coerce = (x) => {
        // 1. React$Element
        // This is the termination condition of this recursive function.
        if (React.isValidElement(x)) {
          return Promise.resolve(x);
        }

        // 2. React Component
        // And this is the second termination condition.
        if (isReactComponent(x)) {
          return Promise.resolve(React.createElement(x));
        }

        // 3. Promise
        if (typeof x.then === 'function') {
          return x.then(coerce).catch(e => <Page>{`\`\`\`hint|warning\nPromise failed.\n${e}\n\`\`\``}</Page>);
        }

        // 4. Function
        // Invoke the function and coerce its return value.
        if (typeof x === 'function') {
          return coerce(x());
        }

        // 5. String
        // Gets complicated, but whatever. Can be either an URL to a markdown file, or the
        // markdown source itself. But wait, could also be an URL to a JS module (which we
        // can import(), in ESnext, so we ignore that case for now).
        //
        // To handle all cases, we resolve the string in all the possible ways we can think
        // of and then try to guess which one the user meant.
        if (typeof x === 'string') {
          return Promise.all([
            fetchMarkdownNoCatch(x).catch(() => undefined),
            Promise.resolve(<Page>{x}</Page>)
          ]).then(results => {
            const firstGoodResult = results.find(r => r !== undefined);
            return firstGoodResult !== undefined ? firstGoodResult : gaveUpPage();
          });
        }

        // 6. Default export from a module
        if (typeof x.default !== 'undefined') {
          return coerce(x.default);
        }

        // 7. Other (number, boolean, object, array, regexp, …)
        return Promise.resolve(gaveUpPage());
      };

      const contentPromiseFn = () => {
        try {
          return coerce(content);
        } catch (e) {
          return Promise.resolve(gaveUpPage());
        }
      };

      return <PageContent {...props} contentPromiseFn={contentPromiseFn} />;
    };
  }

  // Legacy
  if (page.src) {
    return (props) => <PageContent {...props} contentPromiseFn={() => fetchMarkdown(page.src)} />;
  }
  if (page.component) {
    return (props) => <PageContent {...props} contentPromiseFn={() => Promise.resolve(requireModuleDefault(page.component))} />;
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

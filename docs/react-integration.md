> With Catalog you can develop React components directly in your style guide, enable hot-reloading documentation writing, and integrate Catalog in an existing application.

```hint
This section assumes that you have a working development setup with npm, webpack and a ES2015 transpiler (for example Babel).
```

## Catalog React Component

Catalog exports a `Catalog` React component. You can render it as the root element or compose it in other components.

The `Catalog` component takes all [configuration](/configuration) options as **props**.

```code|lang-jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog} from 'catalog';

import Intro from './docs/Intro';
import ButtonDocs from './docs/Buttons';
import GridDocs from './docs/Grids';

ReactDOM.render(
  <Catalog
    title='My Styleguide'
    basePath='/catalog'
    pages={[
      {
        path: '/',
        title: 'Introduction',
        component: Intro
      },
      {
        title: 'Components',
        pages: [
          {path: 'buttons', title: 'Buttons', component: ButtonDocs},
          {path: 'grid', title: 'Grid', component: GridDocs}
        ]
      }
    ]}
  />,
  document.getElementById('app')
);
```

## Hot Reloadable Markdown Files

Catalog provides a [webpack](http://webpack.github.io/) loader which allows you to import hot-reloadable Markdown files.

Also install webpack's `raw-loader` with `npm install raw-loader --save-dev`

You need to make sure that your app has hot module replacement enabled. See [Dan Abramov's react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate) for a starting point.

```hint|directive
The Catalog webpack loader turns Markdown files into React components. Use `component` instead of `src` in the page configuration.
```

```code|lang-jsx
import Introduction from 'catalog/lib/loader!raw!./Introduction.md';

<Catalog
  title='My Styleguide'
  pages={[
    {
      path: '/',
      title: 'Introduction',
      component: Introduction     // <- Use `component` instead of `src`
    },
    // ...
  ]}
/>
```

To save you from prepending `catalog/lib/loader!raw!` to each import, you can also put this in your webpack configuration file:

```code|lang-javascript
{
  // Other webpack config ...
  module: {
    loaders: [
      {
        test: /\.md$/,
        loaders: ['catalog/lib/loader', 'raw']
      }
    ]
  }
};
```

## Advanced Integration

> If you need more control over the integration into your application, Catalog is flexible enough to supports some advanced use cases.

### React Router Routes

The `Catalog` component creates routes and renders React Router with a few presets internally. But with `configureRoutes` you can also generate Catalog routes, so you can

- mix them with other routes,
- use them for server-side rendering,
- configure `Router` however you like.

```code|lang-jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {configureRoutes} from 'catalog';

const catalogRoutes = configureRoutes({
  title: 'My Styleguide',
  basePath: '/catalog',
  pages: [/* ... */]
});

const routes = [
  catalogRoutes,
  // other routes ...
];


ReactDOM.render(
  <Router routes={routes} />,
  document.getElementById('app')
);
```

### Write Documentation with React Components

Instead of using Markdown files, you can use Catalog's `Page` and all specimen components directly to create your own page components. This enables you for example to

- generate documentation programmatically,
- mix specimens with other components,
- or share state across specimens.

```hint|directive
As with the webpack loader transformed Markdown files, use `component` instead of `src` in the page configuration.
```

```code|lang-jsx
import React from 'react';
import {Page, ReactSpecimen, ColorPaletteSpecimen} from 'catalog';
import Button from 'components/Button/Button';

export default () => (
  <Page>
    <h2>My Buttons</h2>

    <p>Are so nice</p>

    <ul>
      <li>Yes</li>
      <li>or no?</li>
    </ul>

    <hr />

    <ReactSpecimen span={3}>
      {'<Button primary>Foo</Button>'}
    </ReactSpecimen>

    <ColorPaletteSpecimen span={3} colors={generateColorPalette()}>
  </Page>
);
```

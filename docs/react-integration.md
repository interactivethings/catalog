> With Catalog you can develop React components directly in your style guide, enable hot-reloading documentation writing, and integrate Catalog in an existing application.

```hint
This section assumes that you have a working development setup with npm, webpack and a ES2015 transpiler (for example Babel).
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

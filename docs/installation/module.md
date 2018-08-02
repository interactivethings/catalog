> Catalog can be integrated as a module into any React application

## Installation

Install the `catalog` npm package and its peer dependencies.

```
npm install catalog react react-dom --save
```

Import Catalog, and render it.

```code|lang-js
import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog} from 'catalog';

ReactDOM.render(
  <Catalog
    title='My Catalog'
    pages={[
      {
        path: '/',                     // The path where the page can be accessed
        title: 'Introduction',         // The page title
        content: require('Intro')      // The documentation component
      },
      // Other pages …
    ]}
  />,
  document.getElementById('app')
);
```

See the [React API](/guides/react) guide for more details.

import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog} from '../../src/index';

ReactDOM.render(
  <Catalog
    configuration={{
      title: 'My Components',
      pages: [
        {
          path: '/',
          title: 'Foo',
          imports: {Foo: require('./components/Foo/Foo')},
          component: require('./components/Foo/Foo.docs.md')
        }
      ]
    }} 
  />,
  document.getElementById('app')
);

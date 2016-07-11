import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog} from '../../src/index';

ReactDOM.render(
  <Catalog
    title='My Components'
    useBrowserHistory
    pages={[
      {
        path: '/',
        title: 'Foo',
        imports: {Foo: require('./components/Foo/Foo')},
        component: require('./components/Foo/Foo.docs.md')
      }
    ]}
  />,
  document.getElementById('app')
);

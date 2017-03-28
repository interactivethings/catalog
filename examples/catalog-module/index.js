import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog, ContentLoader} from '../../src/index';

ReactDOM.render(
  <Catalog
    title='My Components'
    useBrowserHistory={true}
    pages={[
      {
        path: '/',
        title: 'Foo',
        imports: {Foo: require('./components/Foo/Foo')},
        component: ContentLoader('./components/Foo/Foo.docs.md')
      }
    ]}
  />,
  document.getElementById('app')
);

/**
 * This example demonstrates how you can supply Catalog with a custom History handler.
 * This is useful if you want to change the default way Catalog handles the history, e.g.
 * in a situation where you want to use pushState instead of hashHistory and serve
 * Catalog from a sub-folder.
 *
 * For more documentation checkout the React Router and History docs:
 * - https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#examples
 * - https://github.com/reactjs/react-router/blob/master/docs/API.md#userouterhistorycreatehistory
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {useRouterHistory} from 'react-router';
import {createHistory } from 'history';
import {Catalog} from '../../src/index';

const history = useRouterHistory(createHistory)({
  basename: '' // This would be the path Catalog is served from: /mydocs
});

ReactDOM.render(
  <Catalog
    history={history}
    title='My Components'
    pages={[
      {
        path: '/',
        title: 'Foo',
        component: require('./components/Foo.docs.md')
      },
      {
        path: '/bar',
        title: 'Bar',
        component: require('./components/Bar.docs.md')
      }
    ]}
  />,
  document.getElementById('app')
);

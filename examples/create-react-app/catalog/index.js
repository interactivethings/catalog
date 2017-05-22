import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog, ContentLoader} from 'catalog';

import {catalogAppPage} from '../src/App'

const pages = [
  {path: '/', title: 'Welcome', content: ContentLoader(() => import('./WELCOME.md'))},
  {path: '/app', title: 'App', content: ContentLoader(catalogAppPage)},
];

ReactDOM.render(
  <Catalog title='Catalog' pages={pages} />,
  document.getElementById('catalog')
);

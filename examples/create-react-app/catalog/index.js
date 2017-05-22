import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog, ContentLoader, markdown, ReactSpecimen} from 'catalog';

const pages = [
  {path: '/', title: 'Welcome', content: ContentLoader(() => import('./WELCOME.md'))},
  {path: '/app', title: 'App', content: ContentLoader(() => import('../src/App').then(({catalogPage}) => catalogPage({markdown, ReactSpecimen})))},
];

ReactDOM.render(
  <Catalog title='Catalog' pages={pages} />,
  document.getElementById('catalog')
);

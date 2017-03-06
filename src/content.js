import React from 'react';
import Page from './components/Page/Page';

// Content loaded from an URL which points to a text (markdown) file.
//
// > {
// >   path: '/',
// >   content: Catalog.Content.fetchMarkdown('/README.md')
// > }
export const fetchMarkdown = (url) => () =>
  fetch(url, {credentials: 'same-origin'})
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.text();
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    })
    .then(text => <Page>{text}</Page>)
    .catch(error => <Page>{`Catalog.Content.fetchMarkdown: ${error}`}</Page>);

// Content which it represented by a React Component. Usually loaded by
// webpack using a 'require()' statement. This component is instantiated
// with empty props and no children.
//
// > {
// >   path: '/components/MyFancyComponent',
// >   content: Catalog.Content.reactComponent(require('./src/components/MyFancyComponent))
// > }
export const reactComponent = (type) => () =>
  Promise.resolve(React.createElement(type));

// Content which it represented by a React Element. Similar to 'reactComponent',
// but the user is in full control how the component is instantiated. Users are
// encouraged to use '<Page>' as the outer-most element.
//
// > import {Page} from 'catalog'
// > …
// > {
// >   path: '/components/MyFancyComponent',
// >   content: Catalog.Content.reactElement(<Page>…</Page>)
// > }
export const reactElement = (el) => () =>
  Promise.resolve(el);

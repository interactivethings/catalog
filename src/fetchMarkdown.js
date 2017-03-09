import React from 'react';
import Page from './components/Page/Page';

export default (url) =>
  fetch(url, {credentials: 'same-origin'})
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.text();
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    })
    .then(text => <Page>{text}</Page>)
    .catch(error => <Page>{`Catalog.Content.fetchMarkdown: ${error}`}</Page>);

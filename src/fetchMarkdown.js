import React from 'react';
import Page from './components/Page/Page';

const markdownContentTypes = [
  'text/plain',
  'text/x-markdown'
];

const isMarkdownContentType = (h) =>
  markdownContentTypes.some(ct => h.includes(ct));

const isMarkdownResponse = (res) =>
  (res.status >= 200 && res.status < 300) &&
  (!res.headers.has('content-type') || isMarkdownContentType(res.headers.get('content-type')));

// Like 'fetchMarkdown' but doesn't catch errors in the promise.
export const fetchMarkdownNoCatch = (url) =>
  fetch(url, {credentials: 'same-origin'})
    .then(res => {
      if (isMarkdownResponse(res)) {
        return res.text();
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    }).then(text => <Page>{text}</Page>);

export default (url) =>
  fetchMarkdownNoCatch(url)
    .catch(error => <Page>{`Catalog.fetchMarkdown: ${error}`}</Page>);

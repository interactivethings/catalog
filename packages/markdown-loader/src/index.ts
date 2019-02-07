export default function(source: string) {
  const content = JSON.stringify(source);

  const output = `
    import React  from 'react';
    import {PageRenderer} from '@catalog/core';
    
    function WrappedPageRenderer(props) {
      return React.createElement(PageRenderer, Object.assign({}, props, {content:${content}}));
    }
    WrappedPageRenderer.__catalog_loader__ = true;
    export default WrappedPageRenderer;
  `;

  return output;
}

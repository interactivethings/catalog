import React from 'react';
import mdast from 'mdast';
import reactRenderer from 'mdast-react';

import MarkdownSpecimen from '../components/Specimen/MarkdownSpecimen';
import Page from '../components/Page/Page';

const catalogPageRenderer = (mdast, options) => {
  const compilerProto = mdast.Compiler.prototype;

  compilerProto.root = function root(node) {
    return <Page>{this.all(node)}</Page>;
  };

  compilerProto.code = function code({lang, value}) {
    return <MarkdownSpecimen key={++this.reactKeyCounter} body={value} options={lang || ''}/>;
  }; 
};

const styledComponents = (styles = {}) => {
  return Object.keys(styles).reduce((components, type) => {
    return {
      ...components,
      [type]: (props) => React.createElement(type, {...props, style: styles[type]})
    };
  }, {});
};

export const renderPageMarkdown = (text = '', {styles} = {}) => {
  return mdast()
    .use(reactRenderer, {
      entities: false,
      mdastReactComponents: styledComponents(styles)
    })
    .use(catalogPageRenderer)
    .process(text);
};

export const renderContentMarkdown = (text = '', {styles} = {}) => {
  return mdast()
    .use(reactRenderer, {
      entities: false,
      mdastReactComponents: styledComponents(styles)
    })
    .process(text);
};

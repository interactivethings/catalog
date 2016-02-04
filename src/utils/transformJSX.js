import React from 'react';
import {transform} from 'babel-standalone';

const presets = ['es2015-loose', 'react', 'stage-2'];

let cached = {};
const cachedTransform = (jsx) => {
  if (cached[jsx]) {
    return cached[jsx];
  }
  const transformed = transform(jsx, {compact: false, presets}).code;
  cached[jsx] = transformed;
  return transformed;
};

export default (jsx, imports) => {
  try {
    const importKeys = Object.keys(imports);
    const importModules = importKeys.map((k) => imports[k]);
    console.time('transform')
    const transformed = cachedTransform(jsx);
    console.timeEnd('transform')
    const code = transformed.replace(/React\.createElement/, ';return React.createElement');
    console.log(code)
    console.time('render')
    const element = (new Function('React', ...importKeys, code))(React, ...importModules); // eslint-disable-line no-new-func
    console.timeEnd('render')
    return {element};
  } catch (error) {
    console.error('JSX transform failed:', error); // eslint-disable-line no-console
    return {error};
  }
};

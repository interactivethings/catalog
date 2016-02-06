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
    const transformed = cachedTransform(jsx);
    const code = transformed.replace(/React\.createElement/, ';return React.createElement');
    const element = (new Function('React', ...importKeys, code))(React, ...importModules); // eslint-disable-line no-new-func
    return {element};
  } catch (error) {
    return {error};
  }
};

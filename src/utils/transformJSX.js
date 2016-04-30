import React from 'react';
import {transform} from 'babel-standalone';
import requireModuleDefault from './requireModuleDefault';

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

const missingTransformError = {
  error: 'Please include [babel-standalone](https://github.com/Daniel15/babel-standalone) before Catalog.'
};

export default (jsx, imports) => {
  // Check for transform to provide a better error message
  try {
    transform;
  } catch (error) {
    return missingTransformError;
  }

  try {
    const importKeys = Object.keys(imports).filter((k) => imports[k]);
    const importModules = importKeys.map((k) => requireModuleDefault(imports[k]));
    const transformed = cachedTransform(jsx);
    const code = transformed.replace(/React\.createElement/, ';return React.createElement');
    const element = (new Function('React', ...importKeys, code))(React, ...importModules); // eslint-disable-line no-new-func
    return {element};
  } catch (error) {
    return {error};
  }
};

import React from 'react';
import {transform} from 'buble';
import requireModuleDefault from './requireModuleDefault';

let cached = {};
const cachedTransform = (jsx) => {
  if (cached[jsx]) {
    return cached[jsx];
  }
  const transformed = transform(jsx).code;
  cached[jsx] = transformed;
  return transformed;
};

export default (jsx, imports) => {
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

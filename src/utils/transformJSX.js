import React from 'react';
import {transform} from 'babel-standalone';

export default (jsx, imports, presets = ['es2015-loose', 'react', 'stage-2']) => {
  try {
    const importKeys = Object.keys(imports);
    const importModules = importKeys.map((k) => imports[k]);
    const transformed = transform(jsx, {compact: true, presets}).code;
    const code = transformed.replace(/React\.createElement/, 'return React.createElement');
    const element = (new Function('React', ...importKeys, code))(React, ...importModules); // eslint-disable-line no-new-func
    return {element};
  } catch (error) {
    console.error('JSX transform failed:', error); // eslint-disable-line no-console
    return {error};
  }
};

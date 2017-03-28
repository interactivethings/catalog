import babel from 'rollup-plugin-babel';
let version = require('./package.json').version;

let plugins = [
  babel({
    exclude: 'node_modules/**'
  })
];

export default {
  format: 'cjs',
  moduleName: 'Catalog',
  plugins: plugins,
  onwarn: (warning) => {
    if (warning.code === 'UNRESOLVED_IMPORT') { return; }
    console.warn(warning.message);
  },
  banner: '/*! Catalog ' + version + ' http://interactivethings.github.io/catalog/ */'
};

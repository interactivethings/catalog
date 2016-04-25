import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import npm from 'rollup-plugin-npm';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
let version = require('./package.json').version;

let plugins = [
  npm({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      // left-hand side can be an absolute path, a path
      // relative to the current directory, or the name
      // of a module in node_modules
      'node_modules/radium/lib/index.js': [ 'Style', 'StyleRoot' ],
      'node_modules/react/react.js': [ 'Component', 'PropTypes', 'Children', 'createElement' ],
      'node_modules/js-yaml/dist/js-yaml.min.js': [ 'CORE_SCHEMA' ]
    }
  }),
  babel({
    exclude: 'node_modules/**'
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify());
}

export default {
  format: 'umd',
  moduleName: 'Catalog',
  plugins: plugins,
  banner: '/*! Catalog ' + version + ' http://interactivethings.github.io/catalog/ */'
};

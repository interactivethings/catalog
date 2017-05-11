import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
const pkg = require('./package.json');

let plugins = [
  nodeResolve({
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
      'radium': [ 'Style', 'StyleRoot' ],
      'react': [ 'PureComponent', 'Component', 'PropTypes', 'Children', 'createElement', 'isValidElement' ],
      'react-dom': [ 'unstable_renderSubtreeIntoContainer', 'unmountComponentAtNode' ],
      'js-yaml': [ 'safeLoad', 'CORE_SCHEMA', 'Type', 'Schema' ],
      'prop-types': [ 'bool', 'array', 'func', 'object', 'arrayOf', 'oneOfType', 'element', 'shape', 'string' ]
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
  entry: 'src/index-standalone.js',
  format: 'umd',
  moduleName: 'Catalog',
  plugins: plugins,
  globals: {
    'babel-standalone': 'Babel'
  },
  external: [
    'babel-standalone'
  ],
  banner: `/*! Catalog v${pkg.version} ${pkg.homepage} */`
};

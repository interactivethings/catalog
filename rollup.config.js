import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import npm from 'rollup-plugin-npm';

export default {
  entry: 'src/index-standalone.js',
  dest: 'catalog.js',
  format: 'umd',
  moduleName: 'Catalog',
  plugins: [
    npm({
      // jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/radium/lib/index.js': [ 'Style' ],
        'node_modules/react/react.js': [ 'Component', 'PropTypes', 'Children' ],
        'node_modules/js-yaml/index.js': [ 'CORE_SCHEMA' ]
      }
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};

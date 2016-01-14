import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import npm from 'rollup-plugin-npm';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/index-standalone.js',
  dest: 'catalog.min.js',
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
        'node_modules/js-yaml/dist/js-yaml.min.js': [ 'CORE_SCHEMA' ]
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};

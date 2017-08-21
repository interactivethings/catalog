import babel from 'rollup-plugin-babel';
const pkg = require('./package.json');

const externals = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies)
];

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  banner: `/*! Catalog v${pkg.version} ${pkg.homepage} */`,
  external: id => externals.some(d => id.startsWith(d)),
  output: [
    {file: pkg.main, format: 'cjs', name: 'Catalog'},
    {file: pkg.module, format: 'es'}
  ]
};

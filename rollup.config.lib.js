import babel from 'rollup-plugin-babel';
const pkg = require('./package.json');

const externals = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies)
];

export default {
  entry: 'src/index.js',
  moduleName: 'Catalog',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  banner: `/*! Catalog v${pkg.version} ${pkg.homepage} */`,
  external: id => externals.some(d => id.startsWith(d)),
  targets: [
    {dest: pkg.main, format: 'cjs'},
    {dest: pkg.module, format: 'es'}
  ]
};

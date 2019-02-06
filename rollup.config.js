// import cliConfig from './packages/cli/rollup.config.js';

// const externals = [
//   ...Object.keys(pkg.dependencies),
//   ...Object.keys(pkg.peerDependencies),
//   "url"
// ];

export default [
  require("./packages/babel-preset/rollup.config.js"),
  require("./packages/catalog/rollup.config.js"),
  require("./packages/cli/rollup.config.js"),
  require("./packages/core/rollup.config.js"),
  require("./packages/markdown-loader/rollup.config.js")
];

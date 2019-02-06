// import cliConfig from './packages/cli/rollup.config.js';

// const externals = [
//   ...Object.keys(pkg.dependencies),
//   ...Object.keys(pkg.peerDependencies),
//   "url"
// ];

export default [require("./packages/cli/rollup.config.js")];

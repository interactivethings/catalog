import babel from "rollup-plugin-babel";
const pkg = require("./package.json");

const banner = `/*! Catalog v${pkg.version} ${pkg.homepage} */`;

const externals = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  "url"
];

export default {
  input: "src/index.js",
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ],
  external: id => externals.some(d => id.startsWith(d)),
  output: [
    { file: pkg.main, format: "cjs", name: "Catalog", banner, sourcemap: true },
    { file: pkg.module, format: "es", banner, sourcemap: true }
  ]
};

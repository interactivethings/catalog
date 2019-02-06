const babel = require("rollup-plugin-babel");
const pkg = require("./package.json");
const path = require("path");

const banner = `/*! Catalog v${pkg.version} ${pkg.homepage} */`;

const externals = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  "url"
];

module.exports = {
  input: path.resolve(__dirname, "src/index.js"),
  plugins: [
    babel({
      exclude: /node_modules/
    })
  ],
  external: id => externals.some(d => id.startsWith(d)),
  output: [
    {
      dir: path.resolve(__dirname, "dist"),
      entryFileNames: "[name].cjs.js",
      format: "cjs",
      name: "Catalog",
      banner,
      sourcemap: true
    },
    {
      dir: path.resolve(__dirname, "dist"),
      entryFileNames: "[name].es.js",
      format: "es",
      banner,
      sourcemap: true
    }
  ]
};

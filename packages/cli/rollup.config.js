/**
 * WARNING: Don't use rollup's ES import/export here because otherwise file paths won't resolve correctly
 */
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const path = require("path");
const pkg = require("./package.json");

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  "url",
  "fs",
  "path"
];

module.exports = {
  input: [
    path.resolve(__dirname, "src/bin/catalog.ts"),
    path.resolve(__dirname, "src/bin/catalog-start.ts"),
    path.resolve(__dirname, "src/bin/catalog-build.ts")
  ],
  external: id => externals.some(d => id.startsWith(d)),
  plugins: [
    resolve({
      extensions
    }),
    babel({
      extensions
    })
  ],
  output: [
    {
      dir: path.resolve(__dirname, "dist/bin/"),
      entryFileNames: "[name].js",
      format: "cjs",
      banner: "#!/usr/bin/env node"
    }
  ]
};

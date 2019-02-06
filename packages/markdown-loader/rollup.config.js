/**
 * WARNING: Don't use rollup's ES import/export here because otherwise file paths won't resolve correctly
 */
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const path = require("path");
const pkg = require("./package.json");

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  "url",
  "fs",
  "path"
];

const extensions = [".js", ".jsx", ".ts", ".tsx"];

module.exports = {
  input: path.resolve(__dirname, "src/index.ts"),
  external: externals,
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
      dir: path.resolve(__dirname, "dist/"),
      entryFileNames: "[name].js",
      format: "cjs",
      sourcemap: true
    }
  ]
};

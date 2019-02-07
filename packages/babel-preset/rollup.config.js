/**
 * WARNING: Don't use rollup's ES import/export here because otherwise file paths won't resolve correctly
 */
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const path = require("path");

const extensions = [".js", ".jsx", ".ts", ".tsx"];

module.exports = {
  input: path.resolve(__dirname, "src/index.ts"),
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

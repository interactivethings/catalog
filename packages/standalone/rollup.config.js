import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";

let plugins = [
  babel({
    exclude: /node_modules/
  }),
  nodeResolve({
    preferBuiltins: false
  }),
  commonjs({
    include: /node_modules/,
    namedExports: {
      // left-hand side can be an absolute path, a path
      // relative to the current directory, or the name
      // of a module in node_modules
      react: [
        "PureComponent",
        "Component",
        "PropTypes",
        "Children",
        "createElement",
        "isValidElement"
      ],
      "react-dom": [
        "unstable_renderSubtreeIntoContainer",
        "unmountComponentAtNode"
      ],
      "js-yaml": ["safeLoad", "CORE_SCHEMA", "Type", "Schema"],
      "prop-types": [
        "bool",
        "array",
        "func",
        "object",
        "arrayOf",
        "oneOfType",
        "element",
        "shape",
        "string"
      ]
    }
  })
];

export default [
  {
    input: "src/index.js",
    external: ["@babel/standalone"],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("development")
      }),
      ...plugins
    ],
    output: {
      globals: {
        "@babel/standalone": "Babel"
      },
      file: "catalog.development.js",
      format: "umd",
      name: "Catalog"
    }
  },
  {
    input: "src/index.js",
    external: ["@babel/standalone"],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      ...plugins,
      terser()
    ],
    output: {
      globals: {
        "@babel/standalone": "Babel"
      },
      file: "catalog.min.js",
      format: "umd",
      name: "Catalog"
    }
  }
];

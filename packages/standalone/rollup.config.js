import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";

let plugins = [
  babel({
    exclude: "../../**/node_modules/**"
  }),
  nodeResolve({
    jsnext: true,

    /* This should be enabled to allow efficient tree-shaking but it causes
     * problems because the commonjs namedExports option doesn't work correctly
     * in the presence of relative paths. If you enable this you'll get this
     * error:
     *
     * > [!] Error: 'default' is not exported by ../core/node_modules/prop-types/index.js
     */
    module: true,

    main: true,
    browser: true,
    preferBuiltins: false
  }),
  commonjs({
    include: "../../**/node_modules/**",
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

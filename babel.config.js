module.exports = {
  env: {
    test: {
      presets: [
        ["@babel/preset-env", { loose: true, targets: { node: 6 } }],
        "@babel/preset-react",
        "@babel/preset-flow"
      ],
      plugins: [
        "@babel/plugin-syntax-object-rest-spread",
        ["emotion", { autoLabel: true }]
      ]
    }
  }
};

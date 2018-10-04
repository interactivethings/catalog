module.exports = {
  env: {
    test: {
      presets: [["@babel/preset-env", { loose: true, targets: { node: 6 } }]],
      plugins: [
        "@babel/plugin-syntax-object-rest-spread",
        ["emotion", { autoLabel: true }]
      ]
    }
  }
};

module.exports = {
  env: {
    test: {
      presets: [
        ["@babel/preset-env", { loose: true, targets: { node: "current" } }],
        "@babel/preset-react"
      ],
      plugins: [
        "@babel/plugin-syntax-object-rest-spread",
        ["emotion", { autoLabel: true }]
      ]
    }
  }
};

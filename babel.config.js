module.exports = {
  env: {
    test: {
      presets: [
        ["@babel/preset-env", { loose: true, targets: { node: "current" } }],
        "@babel/preset-react",
        "@babel/preset-typescript"
      ],
      plugins: [
        "@babel/plugin-syntax-object-rest-spread",
        ["emotion", { autoLabel: true }]
      ]
    }
  },
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env", { loose: true, targets: { node: 10 } }]
  ]
};

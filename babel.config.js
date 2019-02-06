module.exports = {
  babelrcRoots: [".", "./packages/*"],
  presets: [
    ["@babel/preset-env", { loose: true, targets: { node: 10 } }],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ]
};

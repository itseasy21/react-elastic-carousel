module.exports = {
  presets: [
    ["@babel/preset-env", {
      modules: false,
      targets: {
        browsers: [">0.2%", "not dead", "not op_mini all"]
      }
    }],
    ["@babel/preset-react", {
      runtime: "automatic"
    }]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-transform-runtime", {
      regenerator: true
    }]
  ]
};
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.j(s|sx)$/,
        exclude: /(node_modules)/,
        loader: ["babel-loader"]
      },
      {
        test: /\.(sc|c)ss$/,
        exclude: /(node_modules)/,
        loader: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  // devtool:'#source-map',
  mode: "production"
};

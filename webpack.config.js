const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.tsx", // Update entry file extension to .tsx
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"], // Add .tsx and .ts extensions
  },
  plugins: [
    new htmlWebpackPlugin({ template: path.resolve(__dirname, "index.html") }),
  ],
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/, // SCSS files
        use: [
          "style-loader", // Creates `style` nodes from JS strings
          "css-loader", // Translates CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
};

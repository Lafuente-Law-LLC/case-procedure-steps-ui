const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  return {
    mode: "development",
    entry: "./src/index.tsx", // Update entry file extension to .tsx
    output: {
      publicPath: "/",
      library: { name: "CaseProcedureSteps", type: "umd" },
      clean: true,
      path: path.resolve(__dirname, "lib"),
      filename: "index.js",
    },
    externals: {
      react: {
        root: "React",
        commonjs: "react",
        commonjs2: "react",
        amd: "react",
      },
      "react-dom": {
        root: "ReactDOM",
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "react-dom",
      },
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"], // Add .tsx and .ts extensions
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
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
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
    devServer: {
      port: 3000,
      hot: true,
    },
  };
};

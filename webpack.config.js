const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  return {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      // filename: "index.js",
      // library: "CaseProcedureApp",
      // libraryTarget: "umd",
      // globalObject: "this",
    },
    // externals: {
    //   react: {
    //     root: "React",
    //     commonjs: "react",
    //     commonjs2: "react",
    //     amd: "react",
    //   },
    //   "react-dom": {
    //     root: "ReactDOM",
    //     commonjs: "react-dom",
    //     commonjs2: "react-dom",
    //     amd: "react-dom",
    //   },
    // },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"], // Add .tsx and .ts extensions
      alias: {
        react: path.resolve(__dirname, "node_modules/react"),
      },
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

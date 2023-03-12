/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

const { NODE_ENV = "production" } = process.env;
module.exports = {
  watch: NODE_ENV === "development",
  entry: "./src/index.ts",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ["pnpm run dev"],
        blocking: false,
        parallel: true,
      },
    }),
  ],
};

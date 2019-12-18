const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = merge(baseConfig, {
  entry: "./src/entry-server.js",
  output: {
    libraryTarget: "commonjs2"
  },
  target: "node",
  devtool: "source-map",
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [new VueSSRServerPlugin()]
});

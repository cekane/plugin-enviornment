var path = require("path");
var webpack = require("webpack");
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  // This is the main file that should include all other JS files
  entry: [
    "../src/index.js",
    'webpack-hot-middleware/client?reload=true'
  ],
  resolve: {
    root: [path.join(__dirname, '..', "node_modules")]
  },

  devtool: 'eval',
  // We are watching in the gulp.watch, so tell webpack not to watch
  watch: false,
  // watchDelay: 300,
  output: {
    path: path.join(__dirname, '..', 'lib'),
    filename: 'index.js',
    publicPath: '/lib/'
  },
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
    dgram: 'empty',
    dns: 'empty',
    console: true,
    __filename: true,
    __dirname: true
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /\.css/, loaders: ["style-loader", "css-loader?modules&importLoaders=1&localIdentName=[path][name]--[local]"] },
      { test: /\.scss/,
        exclude: /scripts.+\.scss/,
        loaders: ["style-loader", "css-loader?importLoaders=1!sass"] },
      { test: /scripts.+\.scss/, loaders: ["style-loader", "css-loader?modules&importLoaders=1&localIdentName=[path][name]--[local]!sass"] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'transform?brfs'},
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
        query: {
          "cacheDirectory": true,
          "presets": ['es2015', 'stage-0', 'react'],
          "plugins": [
            "extensible-destructuring",
            "transform-decorators-legacy",
            "transform-react-display-name"
          ],
          "env": {
            "development": {
              "presets": ["react-hmre"]
            }
          }
        }
      },
      { test: /\.gif/, loader: "file-loader?name=../files/[hash:6].[ext]" },
      { test: /\.jpg/, loader: "file-loader?name=../files/[hash:6].[ext]" },
      { test: /\.png/, loader: "file-loader?name=../files/[hash:6].[ext]" },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=../files/[hash:6].[ext]" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=../files/[hash:6].[ext]" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=../files/[hash:6].[ext]" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=../files/[hash:6].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=../files/[hash:6].[ext]" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEMO__: false,
      __STAGING__: true
    }),

    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

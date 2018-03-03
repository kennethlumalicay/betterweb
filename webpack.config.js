var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const pathsToClean = [
  'dist',
  'build'
]

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env','es2015', 'react', 'stage-2'],
              plugins: ['transform-decorators-legacy']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}

module.exports = [{
  entry:'./src/client.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './client.min.js'
  },
  ...commonConfig
}, {
  entry:'./src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './server.min.js'
  },
  target: 'node',
  externals: nodeModules,
  ...commonConfig
}];

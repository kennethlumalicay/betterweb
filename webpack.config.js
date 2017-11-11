var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

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
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

module.exports = [{
  entry:'./dev/client.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './client.min.js'
  },
  ...commonConfig
}, {
  entry:'./dev/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './server.min.js'
  },
  target: 'node',
  externals: nodeModules,
  ...commonConfig
}];

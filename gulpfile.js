// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var nodemon = require('nodemon');
var fs = require('fs');
var browser = require('browser-sync');
require('dotenv').load();

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var config = {
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
};

var serverConfig = {
  entry: './dev/server.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  target: 'node',
  externals: nodeModules
};

var clientConfig = {
  entry: './dev/client.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'client.js'
  }
};

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}

gulp.task('build-server', function(done) {
  webpack({...config, ...serverConfig}).run(onBuild(done));
});

gulp.task('watch-server', function() {
  webpack({...config, ...serverConfig}).watch(100, function(err, stats) {
    onBuild()(err, stats);
    nodemon.restart();
  });
});

gulp.task('build-client', function(done) {
  webpack({...config, ...clientConfig}).run(onBuild(done));
});

gulp.task('watch-client', function() {
  webpack({...config, ...clientConfig}).watch(100, onBuild());
});

gulp.task('build', ['build-client', 'build-server']);
gulp.task('watch', ['watch-client', 'watch-server']);

gulp.task('nodemon', ['watch-client', 'watch-server'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build/server.js'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', function() {
    console.log('Restarted!');
    clearTimeout(st);
    var st = setTimeout(function reload() {
        browser.reload({
          stream: false
        });
      }, 1000);
  });
});

gulp.task('run', ['nodemon'], function() {
  browser.init({
    proxy: "localhost:" + process.env.PORT,
    port: 5555,
    notify: false
  });
});
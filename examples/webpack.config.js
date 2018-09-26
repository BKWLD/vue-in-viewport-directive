const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {

  mode: 'development',

  entry: {
    app: path.join(__dirname, 'app.coffee'),
  },

  output: {
    path: path.join(__dirname, '_build'),
    filename: '[name].js',
    publicPath: '/_build/',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      { 
        test: /\.coffee$/, 
        loader: 'coffee-loader',
        options: {
          transpile: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  
  plugins: [
    new VueLoaderPlugin()
  ],

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js',
      'vue-in-viewport-directive': path.join(__dirname, '..', 'index.coffee')
    }
  },

}

/* eslint-env node */
const merge = require('webpack-merge')
const path = require('path')
const common = require(path.resolve('config/webpack.common.js'))
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const { GenerateSW } = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve('dist'),
    filename: '[name]-[chunkhash].min.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /(\.less)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize',
            'resolve-url-loader',
            'less-loader?sourceMap'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: 'master-[chunkhash].min.css',
      allChunks: true
    }),
    new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true
    }),
    new WebpackPwaManifest({
      name: 'React Boilerplate',
      short_name: 'rb',
      description: 'React Boilerplate',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      start_url: '/',
      icons: [
        {
          src: path.resolve('src/assets/app-icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: 'assets'
        },
        {
          src: path.resolve('src/assets/app-large-icon.png'),
          size: '1024x1024', // you can also use the specifications pattern
          destination: 'assets'
        }
      ]
    })
  ]
})

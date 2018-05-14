/* eslint-env node */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    bundle: path.resolve('src/index')
  },
  resolve: {
    modules: [path.resolve('src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['env', { modules: false }], 'react', 'stage-2'],
            plugins: ['syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|otf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
      // CSS rules are handled separatly in .dev|.prod files
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*'], {
      root: path.resolve('./')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html'),
      filename: 'index.html'
    })
  ]
}

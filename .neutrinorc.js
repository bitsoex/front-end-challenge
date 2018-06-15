if (process.env.NODE_ENV === 'development') require('dotenv').config()

module.exports = {
  use: [
    [
      '@neutrinojs/standardjs',
      {
        env: {
          browser: true
        }
      }
    ],
    '@neutrinojs/eslint',
    [
      '@neutrinojs/react',
      {
        html: {
          baseHref: '/',
          title: 'bitso-challenge'
        },
        devServer: {
          publicPath: '/',
          host: '0.0.0.0',
          port: process.env.PORT
        },
        babel: {
          plugins: ['react-hot-loader/babel']
        },
      }
    ]
  ]
}

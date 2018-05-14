/* eslint-env node */
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const router = new express.Router()

const config = require('./webpack.dev.js')
const compiler = webpack(config)

router.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })
)

router.use(webpackHotMiddleware(compiler))

/*
In development mode index.html will not be writen to disk, so we need to access it from
memory to get the file and send it to all other routes.
 */
router.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html')

  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }

    res.set('content-type', 'text/html')
    res.send(result)
    return res.end()
  })
})

module.exports = router

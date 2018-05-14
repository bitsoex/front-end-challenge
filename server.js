/* eslint-env node */
const express = require('express')
const path = require('path')
const helmet = require('helmet') // Basic headers protection

const bodyParser = require('body-parser')
const winston = require('winston') // Logger
const hpp = require('hpp')
const app = express()

const { PORT = 8080, NODE_ENV: mode } = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
app.use(hpp())

// Images and other static assets
app.use('/static', express.static(path.resolve('static')))

/*
  You may want to add an API here
  app.use('/v1', routerV1)
*/

// File bundles and processed assets
app.use('/', express.static('dist'))

// Check if we're in development mode to use webpackDevServer middleware
if (mode === 'development') {
  app.use(require(path.resolve('config/webpackDevServer')))
}

// Send index to all other routes (production)
app.get('*', (req, res) => res.sendFile(path.resolve('dist/index.html')))

// Start server
app.listen(PORT, () =>
  winston.info(`React Boilerplate server is listening on port: ${PORT}!`)
)

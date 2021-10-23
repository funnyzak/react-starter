const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('.')
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

const webpackConfig = require('./webpack.config')

function runServer() {
  webpackConfig.plugins.push(new DashboardPlugin())

  const compiler = webpack(webpackConfig)
  const devServerOptions = {
    ...webpackConfig.devServer,
    ...config.devServiceConfig,
  }

  const server = new WebpackDevServer(devServerOptions, compiler)
  server.startCallback(() => {
    console.log(`Starting server on http://${devServerOptions.host}}:${devServerOptions.port}`)
  })
}

runServer();

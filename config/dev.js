const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('.');

const webpackConfig = require('./webpack.config');

function runServer() {
  const compiler = webpack({
    ...webpackConfig
  });
  const devServerOptions = {
    ...webpackConfig.devServer,
    ...config.devServiceConfig,
    open: true
  };

  const server = new WebpackDevServer(devServerOptions, compiler);
  server.startCallback(() => {
    console.log(
      `Starting server on http://${devServerOptions.host}:${devServerOptions.port}`
    );
  });
}

runServer();

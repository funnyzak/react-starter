const Webpack = require('webpack')
const webpackConfig = require('./webpack.config')

// 不输出调试map
delete webpackConfig.devtool

function buildBundle() {
  return new Promise((resolve, reject) => {
    const compiler = Webpack(webpackConfig)
    compiler.watch({}, (err, stats) => {
      if (err) {
        reject(err)
      }
      console.log(stats)
      resolve()
    })
  })
}

function buildApp() {
  Promise.all([buildBundle()]).then(() => {
    console.log('app build done.')
    process.exit()
  })
}

buildApp()

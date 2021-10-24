const Webpack = require('webpack')
const path = require('path')
const { delDirPath } = require('./utils')

const webpackConfig = require('./webpack.config')

const config = require('.')

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
  delDirPath(path.resolve(__dirname, `../${config.distOutPutPath}`))

  Promise.all([buildBundle()]).then(() => {
    console.log('app build done.')
    process.exit()
  })
}

buildApp()

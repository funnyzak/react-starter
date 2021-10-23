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
    compiler.watch({}, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

function buildApp() {
  delDirPath(path.resolve(__dirname, `../${config.distOutPutPath}`))

  Promise.all([buildBundle()]).then(() => {
    console.log('starting build your app')
    process.exit()
  })
}

buildApp()

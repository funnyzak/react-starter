const Webpack = require('webpack')
const path = require('path')
const { delDirPath } = require('./utils')

const rendererWebpackConfig = require('./webpack.config')

const config = require('.')

// 不输出调试map
delete rendererWebpackConfig.devtool


function buildBundle() {
  return new Promise((resolve, reject) => {
    const compiler = Webpack(rendererWebpackConfig)
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

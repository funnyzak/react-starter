const path = require('path');
const Webpack = require('webpack');

// https://handlebarsjs.com/guide
const Handlebars = require('handlebars');

// https://www.webpackjs.com/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://www.webpackjs.com/plugins/copy-webpack-plugin/
const CopyWebpackPlugin = require('copy-webpack-plugin');
// https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// https:// github.com/johnagan/clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// https://www.npmjs.com/package/webpack-bundle-analyzer
// eslint-disable-next-line no-unused-vars
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// https://www.npmjs.com/package/git-revision-webpack-plugin
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({
  branch: true
});

const package = require('../package.json');
const config = require('.');

const gitInfo = {
  VERSION: gitRevisionPlugin.version(),
  COMMITHASH: gitRevisionPlugin.commithash(),
  BRANCH: gitRevisionPlugin.branch(),
  LASTCOMMITDATETIME: gitRevisionPlugin.lastcommitdatetime()
};

// 模板参数，应用 index.html、hbs文件
const templateParameters = {
  nowTimeString: new Date().toISOString(),
  // package.json信息
  package,
  // 配置信息
  config,
  // 进程信息
  process: {
    env: process.env
  },
  // git信息
  gitInfo
};

templateParameters.origin = JSON.stringify(templateParameters);

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  context: path.join(__dirname, '../'),
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx')
  },
  devtool: 'source-map',
  // https://webpack.js.org/configuration/stats/
  stats: 'errors-only',
  module: {
    rules: [
      {
        // https://webpack.docschina.org/guides/asset-modules/
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
        generator: {
          filename: 'static/[name].[hash][ext][query]'
        }
      },
      {
        test: /\.(txt|conf)$/i,
        type: 'asset/source',
        exclude: /node_modules/
      },
      {
        test: /\.hbs$/i,
        loader: 'html-loader',
        options: {
          preprocessor: (content, loaderContext) => {
            let result;
            try {
              result = Handlebars.compile(content)({
                ...templateParameters
              });
            } catch (error) {
              loaderContext.emitError(error);
              return content;
            }
            return result;
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'], // tsconfig.json 设置 "target": "es6" ，再用 babel 转换一次
        exclude: /node_modules/
      },
      {
        test: /src\/[^\s]+\.js$/i, // src 下所有js
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', {
          loader: 'less-loader', options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }]
      }
    ]
  },
  optimization: {
    // https://webpack.docschina.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, `../${config.distOutPutPath}`),
    // assetModuleFilename: 'assets/[fullhash][ext][query]',

    // entry file output name
    // filename: '[name].[git-revision-hash].bundle.js',
    filename: '[name].[fullhash:12].bundle.js',

    // un entey file output name
    chunkFilename: '[id].[fullhash:12].chunk.js',

    // 该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，此选项的值都会以 / 结束。
    publicPath: '' // 使用相对路径
  },

  plugins: [
    gitRevisionPlugin,

    // 只在开发时引入的插件
    // ...(process.env.NODE_ENV === 'development'
    //   ? [new BundleAnalyzerPlugin()]
    //   : []),

    // 打包时清理输出文件夹
    new CleanWebpackPlugin(),

    // 全局定义变量，可在代码里直接引用
    new Webpack.DefinePlugin({
      ...gitInfo,
      NODE_ENV: process.env.NODE_ENV,
      PRODUCTION: process.env.NODE_ENV === 'production'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      templateParameters: {
        ...templateParameters
      }
    }),
    // 复制public下资源到dist目录
    new CopyWebpackPlugin({
      patterns: [
        {
          context: 'public',
          from: '**/*',
          to: path.resolve(__dirname, `../${config.distOutPutPath}`),
          force: true,
          priority: 10,
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: [
              '**/*.DS_Store',
              '**/public/_docs/**/*',
              '**/public/index.html'
            ]
          }
        }
      ],
      options: { concurrency: 50 }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/')
    },
    // 支持Tsconfig paths
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.ts', '.tsx']
      })
    ],
    mainFiles: ['index', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.json', '.html']
  },
  target: 'web'
};

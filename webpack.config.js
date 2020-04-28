const path = require('path')
const moduleConfig = require('./build/_common/module')
const devServer = require('./build/_common/devServer')
const getPlugins = require('./build/_common/plugins')

const isDevelopment = process.env.NODE_ENV === 'development'
const publicPath = '/'

// const externals = {
//   react: 'window.React',
//   'react-dom': 'window.ReactDOM',
// }

const webpackConfig = {
  mode: process.env.NODE_ENV,
  name: 'app',
  devtool: isDevelopment ? 'cheap-source-map' : 'none',
  entry: {
    app: path.join(__dirname, './index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath,
  },
  module: moduleConfig,
  plugins: getPlugins(),
  watch: isDevelopment,
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: {
    colors: true,
    warnings: true,
    errors: true,
    errorDetails: true,
    timings: true,
    assets: !isDevelopment,
    all: false,
  },
  devServer: isDevelopment ? devServer : undefined,
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
}

module.exports = webpackConfig

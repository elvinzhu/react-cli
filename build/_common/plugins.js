const path = require('path');
const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const ProgressPlugin = webpack.ProgressPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const PreloadPlugin = require('preload-webpack-plugin');
const DonePlugin = require('../_plugin/done');
const devServer = require('./devServer');

const isDevelopment = process.env.NODE_ENV === 'development';
const template = path.join(process.cwd(), 'public/index.html');

module.exports = function getPlugins(options = {}) {

  const devPlugins = [
    new DonePlugin({
      port: devServer.port,
      openPage: '?templateRelationId=1001#page=1'
    }),
    new HotModuleReplacementPlugin()
  ];

  const prdPlugins = [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
    })
  ];

  return [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PUBLIC_PATH: JSON.stringify(devServer.publicPath),
        ...options.definePlugin
      }
    }),
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      template,
      ...options.htmlPlugin
    }),
    ...isDevelopment
      ? devPlugins
      : prdPlugins,
    new CopyWebpackPlugin([{
      from: './public',
      to: './assets',
      toType: 'dir',
      ignore: ['.DS_Store', 'index.html']
    }])
  ]
}

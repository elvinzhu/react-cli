const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';
const proxy = {
  '/api/template': {
    target: 'http://17577-stech-hongqiao-zatech-channel.test.za-tech.net',
    changeOrigin: true,
    pathRewrite: { '^/api': '/' }
  },
  '/api/order': {
    // target: 'http://17577-stech-hongqiao-zatech-order.test.za-tech.net',
    target: 'http://18325-tc-bzpt-zatech-traefik.test.za-tech.net',
    changeOrigin: true
  },
  '/api/ops/goods': {
    target: 'http://17577-stech-hongqiao-zatech-goods.test.za-tech.net',
    changeOrigin: true,
    pathRewrite: { '^/api': '/' }
  }
}

module.exports = {
  proxy,
  disableHostCheck: true,
  publicPath: '/',
  contentBase: path.join(process.cwd(), 'dist'),
  hot: isDevelopment,
  port: 8080,
  host: '0.0.0.0',
  historyApiFallback: true
}

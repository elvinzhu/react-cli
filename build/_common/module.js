
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

const styleLoader = isDevelopment
  ? 'style-loader'
  : {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDevelopment
    }
  }

module.exports = {
  noParse: /^(react|react-dom|redux|react-router|react-router-dom|classnames|zarm|lodash)$/,
  rules: [{
    test: /\.js?$/,
    exclude: /node_modules/,
    use: ['cache-loader', 'babel-loader']
  }, {
    test: /\.(css|less)$/,
    exclude: /node_modules/,
    use: [styleLoader, {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
      }
    }, {
        loader: 'postcss-loader'
      }, {
        loader: 'less-loader'
      }
    ]
  },
  {
    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        }
      }
    ]
  },
  {
    test: /\.(svg)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]'
        }
      }
    ]
  }]
}

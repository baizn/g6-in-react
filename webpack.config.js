const webpack = require('webpack');
const path = require('path')
// eslint-disable-next-line prefer-destructuring
const resolve = path.resolve;
const HTMLPlugin = require('html-webpack-plugin');
const UglifyJSWebpackPlguin  = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    g6InReact: [
      'webpack-dev-server/client?http://localhost:8080',
      './pages/index.js'],
  },
  output: {
    filename: '[name].min.js',
    library: 'G6',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: resolve(process.cwd(), 'dist/'),
  },
  target: 'web',
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ]
      }
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), 
    new webpack.optimize.AggressiveMergingPlugin(),
    new HTMLPlugin({
      template: './pages/index.html'
    }),
    // 更多配置项参考：https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/
    new UglifyJSWebpackPlguin({
      exclude: /node_modules/,
      uglifyOptions: {
        ecma: 5,
        ie8: true
      }
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 本地测试服务器加载的页面所在的目录，默认webpack-dev-server会为根文件夹提供本地服务器
    // contentBase: "./test-server",
    contentBase: './dist',
    // 监听的端口，默认为8080
    port: 8080,
    // 不跳转
    historyApiFallback: true
  }
};

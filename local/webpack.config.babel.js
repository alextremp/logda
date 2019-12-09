const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const OUTPUT_FOLDER = 'webpack'
const ENTRY_PATH = './local/index.js'
const OUTPUT_FILENAME = 'logda.js'

const webpackConfig = {
  entry: ENTRY_PATH,
  output: {
    path: path.resolve(OUTPUT_FOLDER),
    filename: OUTPUT_FILENAME,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|src\/main\/infrastructure\/thirdparty)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),
    new HtmlWebpackPlugin({
      title: 'LOGDA Demo',
      template: 'local/template.html',
      filename: 'index.html'
    })
  ]
}

module.exports = webpackConfig

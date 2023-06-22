const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    static: { directory: path.resolve('dist') },
    open: true,
    host: 'localhost',
    port: 9000,
    hot: true,
    compress: true,
  },
})

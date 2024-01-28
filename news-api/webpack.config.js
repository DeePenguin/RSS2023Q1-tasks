const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = (...paths) => path.resolve(__dirname, ...paths)

const baseConfig = {
  context: resolve('src'),
  entry: resolve('src', 'index'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [this.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      { test: /\.(tsx?)$/i, loader: 'ts-loader' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '...'],
  },
  output: {
    filename: 'index.js',
    path: resolve('dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({ filename: '[contenthash].css' }),
  ],
}

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod'
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config')

  return merge(baseConfig, envConfig)
}

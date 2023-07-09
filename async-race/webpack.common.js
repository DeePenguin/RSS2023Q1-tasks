const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const PROJECT = {
  title: 'Async Race',
  lang: 'en',
  isEmptyBodyRequired: true,
}

const getTemplate = (subtitle) => `<!DOCTYPE html>
<html lang="${PROJECT.lang}">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${PROJECT.title}${subtitle ? ' | ' + subtitle : ''}</title>
  </head>
  <body class="page">${PROJECT.isEmptyBodyRequired ? '' : '\n    <div class="root" id="root"></div>'}
  </body>
</html>`

const filename = (mode, ext) => `${mode === 'production' ? '[contenthash]' : '[name]'}.${ext}`

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index.ts'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename(this.mode, 'js'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  cache: {
    type: 'filesystem',
  },

  plugins: [
    new StylelintPlugin({
      extensions: ['scss'],
      fix: true,
    }),
    new ESLintPlugin({
      extensions: ['ts'],
    }),
    new HtmlWebpackPlugin({
      templateContent: getTemplate(),
      fileName: 'index.html',
      chunks: ['app'],
    }),
    new MiniCssExtractPlugin({
      filename: filename(this.mode, 'css'),
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname, 'src/assets/favicon.png')),
  ],

  module: {
    rules: [
      {
        test: /\.ts?$/i,
        use: ['ts-loader'],
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          this.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['src/styles/variables.scss', 'src/styles/mixins.scss'],
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp|mp3)$/i,
        type: 'asset',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '...'],
  },
}

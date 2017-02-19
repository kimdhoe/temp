const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

const config = env => {
  const { ifProd, ifNotProd } = getIfUtils(env)

    console.log(resolve(__dirname, '../web-app'))

  return {
    context: resolve(__dirname, '../web-app'),
    entry: removeEmpty([
      ifNotProd('react-hot-loader/patch'),
      ifNotProd('webpack-dev-server/client?http://localhost:8080'),
      ifNotProd('webpack/hot/only-dev-server'),
      './main.js',
    ]),
    output: {
      filename: ifProd('bundle.[chunkhash].js', 'bundle.js'),
      path: resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    devServer: {
      hot: true,
      contentBase: resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    devtool: ifProd('cheap-module-source-map', 'cheap-eval-source-map'),
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: [
              [ 'es2015', { modules: false } ],
              'react',
              'stage-1'
            ],
            plugins: [ 'react-hot-loader/babel' ],
            babelrc: false
          },
        },
        {
          test: /\.s?css$/,
          use: ifProd(
            ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: [
                'css-loader',
                'sass-loader',
                {
                  loader: 'postcss-loader',
                  options: { plugins: () => [ require('autoprefixer') ] }
                }
              ]
            }),
            [
              'style-loader',
              'css-loader',
              'sass-loader',
              {
                loader: 'postcss-loader',
                options: { plugins: () => [ require('autoprefixer') ] }
              }
            ]
          )
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'url-loader'
        }
      ]
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new ExtractTextPlugin('styles.css'),
      ifNotProd(new webpack.HotModuleReplacementPlugin()),
      ifNotProd(new webpack.NamedModulesPlugin())
    ])
  }
}

module.exports = config


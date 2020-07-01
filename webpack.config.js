const path = require('path')

const fs = require('fs-extra')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

/**
 * Webpack can be passed a few environment variables to override the default
 * files used to run this project. The environment variables are CUSTOM_CSS,
 * HTML_FILE, YAML_CONFIG, and JS_CONFIG. They must each be passed in the
 * format --env.*=/path/to/file. For example:
 *
 *    yarn start --env.YAML_CONFIG=/absolute/path/to/config.yml
 */
module.exports = async env => {
  // Gather the CSS, HTML, YAML, and JS override files.
  const CUSTOM_CSS = env && env.CUSTOM_CSS || './lib/style.scss'
  const HTML_FILE = env && env.HTML_FILE || 'lib/index.tpl.html'
  const YAML_CONFIG = env && env.YAML_CONFIG || './config.yml'
  // resolve the custom js file. If it is present, copy the file to a
  // temporary folder within this project so that the file will be able to
  // use the node_modules from this project
  let customJsFile = './config.js'
  if (env && env.JS_CONFIG) {
    const splitPath = env.JS_CONFIG.split(path.sep)
    customJsFile = `../tmp/${splitPath[splitPath.length - 1]}`
    // copy location is relative to root, while js file for app is relative to lib
    await fs.copy(env.JS_CONFIG, `./tmp/${splitPath[splitPath.length - 1]}`)
  }
  return {
    entry: [
      './lib/main.js',
      CUSTOM_CSS
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(yml|yaml)$/,
          loader: ['json-loader', 'yaml-loader']
        },
        {
          test: /\.(sc|c)ss$/,
          use: [
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: path.join(__dirname, '/dist'),
      publicPath: '',
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: HTML_FILE,
        inject: 'body',
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        // Optionally override the default config files with some other
        // files.
        YAML_CONFIG: JSON.stringify(YAML_CONFIG),
        JS_CONFIG: JSON.stringify(customJsFile)
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({}),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    devServer: {
      contentBase: './',
      historyApiFallback: true
    }
  }
}

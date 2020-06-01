const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { configReplacer } = require('@packages/helpers-rtkit/webpack');

const paths = require('./paths');
const env = require('./environment');
const { version } = require('../package.json');

const cssModuleRegex = /\.module\.css$/;
const svgInlineRegexp = /\.inline\.svg$/;

env.verbose();

const common = {
  context: paths.appPath,

  entry: [
    // Отлючено до момента создания react админки
    // 'babel-polyfill',
    'normalize.css',
    './src/index',
  ],

  mode: 'production',

  output: {
    path: paths.appBuild,
    filename: '[name]-[hash:4].js',
    sourceMapFilename: '[name].js.map',
    publicPath: '/',
  },

  resolve: {
    modules: [paths.appNodeModules, paths.appSrc],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      // Настройка обработки css файлов
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      })
    ],
  },

  stats: {
    colors: true,
    children: false,
    errors: true,
    errorDetails: true,
  },

  devtool: env.VARIABLES.WEBPACK_DEVTOOL,

  plugins: [
    env.plugin,

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),

    /**
     * Это изменит каталог, в котором webpack должен искать файлы ./src/locales - 
     * вместо чего-то подобного ./node_modules/moment/locales.
     *  https://gist.github.com/iamakulov/59d88d00404259abb83daaf51b70cb07
     */
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/, /ru|en/
    ),

    new HappyPack({
      id: 'happybabel',
      loaders: [
        {
          loader: 'babel-loader',
          options: { babelrc: true, cacheDirectory: true },
        },
      ],
    }),

    new CopyWebpackPlugin([
      {
        from: './src/configTemplate.json',
        to: './config.json',
        transform(content) {
          return configReplacer(content, env.VARIABLES);
        },
      },
    ]),

    new ManifestPlugin({
      fileName: 'main.json',
      // Заготовка для получения файлов Ruby скриптами
      // publicPath: '/bundle/key_admin/',
      seed: { version },
    }),
  ],

  module: {
    rules: [
      {
        use: ['happypack/loader?id=happybabel'],
        test: /\.(t|j)sx?$/,
        include: paths.appSrc,
      },
      {
        test: /\.css$/,
        exclude: cssModuleRegex,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: cssModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.jpe?g$|\.gif$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: svgInlineRegexp,
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: svgInlineRegexp,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
};

module.exports = common;

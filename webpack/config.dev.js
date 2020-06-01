const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./config');
const { VARIABLES } = require('./environment');

const config = {
  devtool: 'eval-cheap-module-source-map',

  plugins: [new webpack.HotModuleReplacementPlugin()],

  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', 
    'webpack/hot/only-dev-server',
  ],

  devServer: {
    hot: true,
    host: VARIABLES.DEV_HOST,
    port: VARIABLES.DEV_PORT,
    historyApiFallback: true,
    proxy: {
      '/api/v3/companies': {
        target: 'http://dmh-api-1.staging.dmh.restr.im:3556',
        secure: false,
        changeOrigin: true,
        autoRewrite: true,
      },
      '/api/v3/': {
        target: 'http://dmh-api-1.staging.dmh.restr.im:3555',
        secure: false,
        changeOrigin: true,
        autoRewrite: true,
      },
      '/api/v1/': {
        target: 'http://dmh-api-1.staging.dmh.restr.im:3559',
        secure: false,
        changeOrigin: true,
        autoRewrite: true,
      },
      // Проксирование запросов стилей со staging
      '/assets/': {
        target: 'https://admin.camera-staging.vc.restr.im',
        secure: false,
        changeOrigin: true,
        autoRewrite: true,
      },
    },
  },
};

module.exports = merge(common, config);

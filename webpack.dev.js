/* eslint-disable no-undef */
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    liveReload: false, // Disable live reload for better performance
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      logging: 'warn', // Reduce console spam
    },
  },
});

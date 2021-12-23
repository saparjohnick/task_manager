const { webpackConfig, merge } = require('@rails/webpacker');

const customConfig = {
  resolve: {
    extensions: ['.css'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = merge(webpackConfig, customConfig);

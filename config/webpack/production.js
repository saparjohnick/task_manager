process.env.NODE_ENV = process.env.NODE_ENV || 'production';
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const environment = require('./environment');

// environment.plugins.append(
//   'BundleAnalyzer',
//   new BundleAnalyzerPlugin({
//     analyzerMode: 'static',
//     openAnalyzer: true,
//   })
// );

const config = environment.toWebpackConfig();
config.devtool = 'none';
config.performance = {
  maxAssetSize: 250000,
};

module.exports = config;

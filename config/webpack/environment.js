const { environment } = require('@rails/webpacker');

environment.config.merge({
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

module.exports = environment;

environment.loaders.delete('nodeModules');

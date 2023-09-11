const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, context: { env } }) => {
    const isEnvDevelopment = env === 'development';
    if (isEnvDevelopment) {
      const newConfig = {
        ...webpackConfig,
        plugins: [
          ...webpackConfig.plugins,
          isEnvDevelopment &&
            new WorkboxWebpackPlugin.InjectManifest({
              swSrc: path.resolve(__dirname, 'src/service-worker.ts'),
              dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
              exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
              maximumFileSizeToCacheInBytes: 9 * 1024 * 1024,
            }),
        ],
      };
      return newConfig;
    } else {
      return webpackConfig;
    }
  },
};
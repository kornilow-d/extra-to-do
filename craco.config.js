const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },

    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.js$/,
        include: /\/node_modules\/@semcore\//,
        enforce: 'pre',
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: true,
            configFile: false,
            plugins: [
              [
                '@semcore/babel-plugin-react-semcore',
                { theme: '@semcore/theme-redesign' },
              ],
            ],
          },
        },
      });

      return webpackConfig;
    },
  },
};

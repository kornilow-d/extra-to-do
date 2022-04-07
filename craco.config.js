module.exports = {
  webpack: {
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

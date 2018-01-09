'use strict';

const webpack = require('webpack');
const SamlMiddleware = require('../saml/saml-middleware.js');

const PUBLIC_PATH_HOST = process.env.PUBLIC_PATH_HOST || '0.0.0.0';

module.exports = {
  profile: true, // capture timing information for each module
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    watchContentBase: false,
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: [
        '**/*.spec.ts', // exclude specs from watching in dev mode
        '**/node_modules/**',
        '**/svg-icons/dest/**',
        '**/tmp/whitelabel/**'
      ]
    },
    port: 3000,
    host: '0.0.0.0', //this makes webpack-dev-server listen to all network interfaces
    hot: false,
    inline: true,
    before: function(app) {
      app.get('/saml-redirect', new SamlMiddleware().authenticate());
    }
  },
  output: {
    // solve problem of using url in css
    // https://github.com/webpack/style-loader/issues/55
    publicPath: 'http://' + PUBLIC_PATH_HOST + ':3000/' + process.env.APP_DIST_DIR + '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      AUTH: {
        key: '"WF9hlAcf8OZiH9ecpIcxXMwL6SYa"',
        secret: '"uW7sdqt8TYWC_UDWVEqdD8sOYwQa"'
      },
      ENVIRONMENT: '"development"'
    })
  ]
};

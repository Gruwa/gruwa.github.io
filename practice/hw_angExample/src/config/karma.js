'use strict';

let karmaConfig = require('./configurations/karma-generic');

switch (process.env.NODE_ENV) {
  case 'dev':
    console.log('* Using "dev" environment config. Open http://localhost:9222 for debug');
    break;

  case 'chrome':
    console.log('* Using "chrome" environment config');
    karmaConfig.browsers = ['Chrome'];
    break;

  case 'prod':
    console.log('* Using "prod" environment config');
    karmaConfig.reporters = karmaConfig.reporters.concat(['junit', 'allure']);
    karmaConfig.remapCoverageReporter = { cobertura: './coverage/cobertura.xml' };
    karmaConfig.junitReporter = {
      outputDir: './'
    };
    karmaConfig.autoWatch = false;
    karmaConfig.singleRun = true;

    // flag to fail build (can be overwritten in local configs)
    karmaConfig.webpack.bail = true;

    // custom plugin to exit with failure code in "prod" mode if there are any errors (TS compilation, tslint, etc)
    karmaConfig.webpack.plugins.push(function() {
      this.plugin('done', (stats) => {
        if (karmaConfig.webpack.bail && stats.compilation.errors && stats.compilation.errors.length) {
          process.on('exit', () => {
            console.log('BUILD FAILED DUE TO COMPILATION ERRORS');
            process.exit(1);
          });
        }
      });
    });

    break;

  default:
    console.log('No environment defined --> quit with failure');
    process.exit(1);
}

module.exports = karmaConfig;

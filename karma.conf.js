'use strict';

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE', 'PhantomJS' ]
var browsers =
  (process.env.TEST_BROWSERS || 'ChromeHeadless')
    .replace(/^\s+|\s+$/, '')
    .split(/\s*,\s*/g)
    .map(function(browser) {
      if (browser === 'ChromeHeadless') {
        process.env.CHROME_BIN = require('puppeteer').executablePath();

        // workaround https://github.com/GoogleChrome/puppeteer/issues/290
        if (process.platform === 'linux') {
          return 'ChromeHeadless_Linux';
        }
      }

      return browser;
    });


module.exports = function(karma) {
  karma.set({

    frameworks: [
      'mocha',
      'chai'
    ],

    files: [
      'test/spec/**/*.js'
    ],

    preprocessors: {
      'test/spec/**/*.js': [ 'webpack' ]
    },

    reporters: 'dots',

    browsers: browsers,

    browserNoActivityTimeout: 30000,

    customLaunchers: {
      ChromeHeadless_Linux: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ],
        debug: true
      }
    },

    autoWatch: false,
    singleRun: true,

    webpack: {
      mode: 'development',
      devtool: 'eval-source-map',
      module: {
        rules: [
          {
            test: /\.(bpmn|dmn)$/,
            use: 'raw-loader'
          }
        ]
      }
    }
  });

};

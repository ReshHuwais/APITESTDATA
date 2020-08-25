// conf.js
var APIHelper = require('./ApiHelperMethods');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');


exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites : {
        API_DATA_CHECK: ['spec.js']            
    },
   onPrepare: function () {
      global.APIHelper  = new APIHelper();
      jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
        savePath: './test/reports'
      }))
    },

      
};

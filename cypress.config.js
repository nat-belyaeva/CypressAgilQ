const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '717nmj',
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  defaultCommandTimeout: 50000,
  requestTimeout: 20000,
  pageLoadTimeout: 50000,
  video: false,
  e2e: {
    baseUrl: 'https://loginauto.agilquest.com',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*'],
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    mochaFile: 'reports/test-results-[hash].xml',
    reportFilename: 'mochawesome',
    reportDir: 'mochawesomeReports',
    overwrite: true
  },
});

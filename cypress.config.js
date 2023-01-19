const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  video: false,
  e2e: {
    baseUrl: 'https://loginauto.agilquest.com/',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*'],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

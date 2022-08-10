const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    domain_username: 'commerce-demo.store',
    domain_password: 'Commerce_Testing!2#4',
    bluehost_username: 'roshan.si',
    bluehost_password: 'Rks@4151',
    wpUsername: 'admin',
    wpPassword: 'password',
  },
  downloadsFolder: 'tests/cypress/downloads',
  fixturesFolder: 'tests/cypress/fixtures',
  screenshotsFolder: 'tests/cypress/screenshots',
  video: true,
  videosFolder: 'tests/cypress/videos',
  videoUploadOnPasses: false,
  experimentalFetchPolyfill: true,
  chromeWebSecurity: false,
  viewportWidth: 1024,
  viewportHeight: 768,
  e2e: {
    setupNodeEvents(on, config) {
      return require('./tests/cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://my.bluehost.com',
    specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/index.js',
  },
});

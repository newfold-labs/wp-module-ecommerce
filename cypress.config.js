const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
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
    baseUrl: 'https://commerce-demo.store/wp-admin/admin.php?page=bluehost#/home/store/general',
    specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/index.js',
  },
});

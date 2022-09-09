const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // projectId: 'gpdgcu',
  env: {
    wpUsername: 'admin',
    wpPassword: 'password',
    db: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'local',
      socketPath:
        '/Users/roshan.si/Library/Application Support/Local/run/dWsvNxyko/mysql/mysqld.sock',
    },
    // change table name if used different
    wpOptionTableName: 'wp_options',
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
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/cypress/plugins/index.js')(on, config);
    },
    experimentalSessionAndOrigin: true,
    baseUrl: 'http://localhost:10003',
    specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/index.js',
  },
});

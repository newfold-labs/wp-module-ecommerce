const { defineConfig } = require('cypress')
const cypressReplay = require("@replayio/cypress")
const { phpVersion, core } = require('./.wp-env.json')
const wpVersion = /[^/]*$/.exec(core)[0]

module.exports = defineConfig({
	env: {
		wpUsername: 'admin',
		wpPassword: 'password',
		wpVersion,
		phpVersion,
	},
	downloadsFolder: 'tests/cypress/downloads',
	fixturesFolder: 'tests/cypress/fixtures',
	screenshotsFolder: 'tests/cypress/screenshots',
	video: true,
	videosFolder: 'tests/cypress/videos',
	videoUploadOnPasses: false,
	chromeWebSecurity: false,
	viewportWidth: 1024,
	viewportHeight: 768,
	blockHosts: [
		'*doubleclick.net',
		'*jnn-pa.googleapis.com',
		'*youtube.com',
	],
	e2e: {
		setupNodeEvents(on, config) {
			const semver = require('semver');

			// Setup Replay
			cypressReplay.default(on, config);

			// Ensure that the base URL is always properly set.
			if (config.env && config.env.baseUrl) {
				config.baseUrl = config.env.baseUrl;
			}
			return config;
		},
		baseUrl: 'http://localhost:8882',
		specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: 'tests/cypress/support/index.js',
		testIsolation: false,
	},
})
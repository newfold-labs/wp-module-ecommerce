/**
 * Import @wordpress/scripts base webpack config.
 * @see https://github.com/WordPress/gutenberg/tree/master/packages/scripts#extending-the-webpack-config
 */
const wpScriptsConfig = require('@wordpress/scripts/config/webpack.config');

wpScriptsConfig.output.library = {
    type: 'commonjs',
}

module.exports = wpScriptsConfig;
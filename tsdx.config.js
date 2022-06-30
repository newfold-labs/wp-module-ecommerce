const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup');
module.exports = {
	rollup(config, options) {
		config.plugins = [url(), svgr(), ...config.plugins];
		return config;
	}
};

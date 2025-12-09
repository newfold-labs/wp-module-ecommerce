/**
 * Import @wordpress/scripts base webpack config.
 * @see https://github.com/WordPress/gutenberg/tree/master/packages/scripts#extending-the-webpack-config
 */

const path = require( 'path' );
const wpScriptsConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { merge } = require( 'webpack-merge' );
const RtlCssPlugin = require("@wordpress/scripts/plugins/rtlcss-webpack-plugin");

// Remove default MiniCssExtractPlugin and RtlCssPlugin
wpScriptsConfig.plugins = wpScriptsConfig.plugins.filter(
	(plugin) => !(plugin instanceof MiniCssExtractPlugin || plugin instanceof RtlCssPlugin)
);

const modules = [ 'quick-add-product', 'store-info' ].map(
	(module) => merge(
		wpScriptsConfig,
		{
			entry: {
				[ module ]: `./src/${ module }/index.js`,
			},
			output: {
				path: path.resolve( process.cwd(), `./build/${module}` ),
				filename: `./index.js`,
				clean: false
			},
			module: {
				rules: [
					{
						test: /\.css$/,
						use: [
							MiniCssExtractPlugin.loader,
							'css-loader',
							'postcss-loader'
						]
					}
				]
			},
			plugins: [
				new MiniCssExtractPlugin( {
					filename: `${ module }.css`,
				} ),
			],
		}
	)
);

module.exports = [
	...modules
];

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

module.exports = [
	merge(
		wpScriptsConfig,
		{
			entry : {
				"panel": "./src/panel/index.js",
			},
			output : {
				path: path.resolve( process.cwd(), './build' ),
				filename : "./index.js",
				library: {
					type: 'commonjs'
				}
			},
		}
	),
	merge(
		wpScriptsConfig,
		{
			entry : {
				"quick-add-product": "./src/quick-add-product/index.js",
			},
			output : {
				path: path.resolve( process.cwd(), './build' ),
				filename : "./quick-add-product/index.js",
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
			plugins : [
				new MiniCssExtractPlugin( {
					filename: 'quick-add-product/quick-add-product.css',
				} ),
			],
		}
	)
];

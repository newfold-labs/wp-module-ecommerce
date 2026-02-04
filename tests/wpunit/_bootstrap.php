<?php
/**
 * Bootstrap file for wpunit tests.
 *
 * @package NewfoldLabs\WP\Module\ECommerce
 */

$module_dir = dirname( dirname( __DIR__ ) );

// Define constants used by the module when not loaded via container.
if ( ! defined( 'NFD_ECOMMERCE_DIR' ) ) {
	define( 'NFD_ECOMMERCE_DIR', $module_dir );
}
if ( ! defined( 'NFD_ECOMMERCE_BUILD_DIR' ) ) {
	define( 'NFD_ECOMMERCE_BUILD_DIR', $module_dir . '/build/' );
}
if ( ! defined( 'NFD_ECOMMERCE_PLUGIN_URL' ) ) {
	define( 'NFD_ECOMMERCE_PLUGIN_URL', 'https://example.com/wp-content/plugins/bluehost/' );
}
if ( ! defined( 'NFD_ECOMMERCE_PLUGIN_DIRNAME' ) ) {
	define( 'NFD_ECOMMERCE_PLUGIN_DIRNAME', 'bluehost' );
}
if ( ! defined( 'NFD_ECOMMERCE_MODULE_VERSION' ) ) {
	define( 'NFD_ECOMMERCE_MODULE_VERSION', '1.0.0' );
}

require_once $module_dir . '/bootstrap.php';

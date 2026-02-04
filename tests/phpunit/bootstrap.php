<?php
/**
 * PHPUnit bootstrap for ecommerce module unit tests.
 *
 * When WP_PHPUNIT__DIR is set (WordPress test suite), that bootstrap is loaded.
 * Otherwise only the module and its autoloader are loaded so tests can run
 * without a full WordPress install (e.g. in CI using Codeception for wpunit).
 */

$module_root = dirname( dirname( __DIR__ ) );

// Composer autoload (module repo has its own vendor when run from module root).
if ( file_exists( $module_root . '/vendor/autoload.php' ) ) {
	require $module_root . '/vendor/autoload.php';
}

// Constants used by the module when not loaded via container.
if ( ! defined( 'NFD_ECOMMERCE_DIR' ) ) {
	define( 'NFD_ECOMMERCE_DIR', $module_root );
}
if ( ! defined( 'NFD_ECOMMERCE_MODULE_VERSION' ) ) {
	define( 'NFD_ECOMMERCE_MODULE_VERSION', '1.0.0' );
}

// Optional: load WordPress test suite when available (e.g. local wp-dev-env).
$wp_phpunit_dir = getenv( 'WP_PHPUNIT__DIR' );
if ( $wp_phpunit_dir && is_dir( $wp_phpunit_dir ) && file_exists( $wp_phpunit_dir . '/includes/bootstrap.php' ) ) {
	require $wp_phpunit_dir . '/includes/bootstrap.php';
}

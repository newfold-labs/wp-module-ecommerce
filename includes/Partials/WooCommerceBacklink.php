<?php
namespace NewfoldLabs\WP\Module\ECommerce\Partials;

use NewfoldLabs\WP\Module\ECommerce\Permissions;

class WooCommerceBacklink {

	public static $hook_suffixes = array(
		'post.php',
		'post-new.php',
		'edit-tags.php',
		'woocommerce_page_wc-admin',
		'woocommerce_page_wc-settings',
		'product_page_product_importer',
	);

	public static function init() {
		foreach ( self::$hook_suffixes as $hook_suffix ) {
			add_action( 'load-' . $hook_suffix, array( __CLASS__, 'add_back_link' ), 100 );
		}
	}

	public static function add_back_link() {
		\wp_enqueue_script( 'nfd-ecommerce-woocommerce-captive', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/woocommerce.js', array(), '1', true );
		\wp_enqueue_style( 'nfd-ecommerce-woocommerce-captive', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/woocommerce.css', null, '1', 'screen' );
	}
}

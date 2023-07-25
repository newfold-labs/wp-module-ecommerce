<?php
namespace NewfoldLabs\WP\Module\ECommerce\Partials;

use NewfoldLabs\WP\ModuleLoader\Container;

class WooCommerceBacklink {

	public static $container;
	/**
	 * @var array
	 *
	 * Hook suffixes to attach Back button
	 */
	public static $hook_suffixes = array(
		'post.php',
		'post-new.php',
		'edit-tags.php',
		'woocommerce_page_wc-admin',
		'woocommerce_page_wc-settings',
		'product_page_product_importer',
	);

	public static function init(Container $container) {
		WooCommerceBacklink::$container = $container;
		foreach ( self::$hook_suffixes as $hook_suffix ) {
			add_action( 'load-' . $hook_suffix, array( __CLASS__, 'add_back_link' ), 100 );
		}
	}

	public static function add_back_link() {
		$runtime = array( 'pluginId' => WooCommerceBacklink::$container->plugin()->id );
		\wp_enqueue_script( 'nfd-ecommerce-woocommerce-captive', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/woocommerce.js', array(), '1', true );
		\wp_enqueue_style( 'nfd-ecommerce-woocommerce-captive', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/woocommerce.css', null, '1', 'screen' );
		\wp_add_inline_script(
			'nfd-ecommerce-woocommerce-captive',
			'nfdEcommerce =' . wp_json_encode( $runtime ) . ';',
			'before'
		);
	}
}
